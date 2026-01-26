import { useState, useCallback, useEffect, useRef } from 'react';
import { AppState, type AppStateStatus } from 'react-native';
import type { RecipeProgress } from '@/types/cooking';
import { cookingStorage } from '@/lib/storage';

export function useRecipeProgress(recipeId: string) {
  const [savedProgress, setSavedProgress] = useState<RecipeProgress | null>(
    null
  );
  const [isLoading, setIsLoading] = useState(true);
  const currentProgressRef = useRef<{
    stepIndex: number;
    timerRemaining?: number;
  } | null>(null);

  // Load saved progress on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const progress = await cookingStorage.getProgress(recipeId);
        setSavedProgress(progress);
      } catch (error) {
        console.warn('Could not load cooking progress:', error);
      } finally {
        setIsLoading(false);
      }
    };
    loadProgress();
  }, [recipeId]);

  const saveProgress = useCallback(
    async (stepIndex: number, timerRemaining?: number) => {
      currentProgressRef.current = { stepIndex, timerRemaining };

      const progress: RecipeProgress = {
        recipeId,
        currentStepIndex: stepIndex,
        timerRemainingSeconds: timerRemaining,
        savedAt: new Date().toISOString(),
      };

      try {
        await cookingStorage.saveProgress(progress);
        setSavedProgress(progress);
      } catch (error) {
        console.warn('Could not save cooking progress:', error);
      }
    },
    [recipeId]
  );

  const clearProgress = useCallback(async () => {
    currentProgressRef.current = null;
    try {
      await cookingStorage.clearProgress(recipeId);
      setSavedProgress(null);
    } catch (error) {
      console.warn('Could not clear cooking progress:', error);
    }
  }, [recipeId]);

  // Save progress when app goes to background
  useEffect(() => {
    const handleAppStateChange = (nextState: AppStateStatus) => {
      if (
        nextState === 'background' ||
        (nextState === 'inactive' && currentProgressRef.current)
      ) {
        const { stepIndex, timerRemaining } = currentProgressRef.current!;
        saveProgress(stepIndex, timerRemaining);
      }
    };

    const subscription = AppState.addEventListener(
      'change',
      handleAppStateChange
    );
    return () => {
      subscription.remove();
    };
  }, [saveProgress]);

  const updateCurrentProgress = useCallback(
    (stepIndex: number, timerRemaining?: number) => {
      currentProgressRef.current = { stepIndex, timerRemaining };
    },
    []
  );

  return {
    savedProgress,
    saveProgress,
    clearProgress,
    updateCurrentProgress,
    hasSavedProgress: savedProgress !== null,
    isLoading,
  };
}
