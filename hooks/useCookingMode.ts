import { useState, useCallback, useMemo, useEffect } from 'react';
import type { Recipe, RecipeStep } from '@/types/recipe';
import type { RecipeProgress } from '@/types/cooking';
import { useAutoHide } from './useAutoHide';
import { useCookingTimer } from './useCookingTimer';
import { useRecipeProgress } from './useRecipeProgress';
import { triggerNavigationHaptic } from '@/lib/haptics';

interface UseCookingModeOptions {
  recipe: Recipe;
  initialStepIndex?: number;
  initialTimerSeconds?: number;
  onComplete: () => void;
  onExit: () => void;
}

export function useCookingMode({
  recipe,
  initialStepIndex = 0,
  initialTimerSeconds,
  onComplete,
  onExit,
}: UseCookingModeOptions) {
  const [currentStepIndex, setCurrentStepIndex] = useState(initialStepIndex);

  const steps = recipe.steps;
  const totalSteps = steps.length;

  const currentStep: RecipeStep | undefined = steps[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === totalSteps - 1;

  // Progress bar auto-hide
  const {
    isVisible: isProgressBarVisible,
    show: showProgressBar,
    toggle: toggleProgressBar,
  } = useAutoHide(true);

  // Timer for current step
  const timerMinutes = currentStep?.timerMinutes ?? 0;
  const timer = useCookingTimer(
    initialTimerSeconds !== undefined
      ? initialTimerSeconds / 60
      : timerMinutes,
    {
      onComplete: () => {
        // Timer completed, could show notification
      },
    }
  );

  // Progress persistence
  const { saveProgress, clearProgress, updateCurrentProgress } =
    useRecipeProgress(recipe.id);

  // Update current progress ref for background save
  useEffect(() => {
    updateCurrentProgress(
      currentStepIndex,
      timer.state !== 'idle' ? timer.remainingSeconds : undefined
    );
  }, [currentStepIndex, timer.remainingSeconds, timer.state]);

  // Navigation
  const goToNextStep = useCallback(async () => {
    if (isLastStep) {
      await clearProgress();
      onComplete();
      return;
    }

    await triggerNavigationHaptic();
    const nextIndex = currentStepIndex + 1;
    setCurrentStepIndex(nextIndex);
    showProgressBar();

    // Reset timer for new step if it has one
    const nextStep = steps[nextIndex];
    if (nextStep?.timerMinutes) {
      timer.reset(nextStep.timerMinutes);
    }

    // Save progress
    saveProgress(nextIndex);
  }, [
    isLastStep,
    currentStepIndex,
    steps,
    clearProgress,
    onComplete,
    showProgressBar,
    timer,
    saveProgress,
  ]);

  const goToPreviousStep = useCallback(async () => {
    if (isFirstStep) return;

    await triggerNavigationHaptic();
    const prevIndex = currentStepIndex - 1;
    setCurrentStepIndex(prevIndex);
    showProgressBar();

    // Reset timer for new step if it has one
    const prevStep = steps[prevIndex];
    if (prevStep?.timerMinutes) {
      timer.reset(prevStep.timerMinutes);
    }

    // Save progress
    saveProgress(prevIndex);
  }, [isFirstStep, currentStepIndex, steps, showProgressBar, timer, saveProgress]);

  const goToStep = useCallback(
    async (index: number) => {
      if (index < 0 || index >= totalSteps) return;

      await triggerNavigationHaptic();
      setCurrentStepIndex(index);
      showProgressBar();

      // Reset timer for new step if it has one
      const step = steps[index];
      if (step?.timerMinutes) {
        timer.reset(step.timerMinutes);
      }

      // Save progress
      saveProgress(index);
    },
    [totalSteps, steps, showProgressBar, timer, saveProgress]
  );

  const handleExit = useCallback(async () => {
    await clearProgress();
    onExit();
  }, [clearProgress, onExit]);

  const handleScreenTap = useCallback(() => {
    toggleProgressBar();
  }, [toggleProgressBar]);

  return {
    // Step navigation
    currentStepIndex,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,

    // Progress bar
    isProgressBarVisible,
    showProgressBar,
    handleScreenTap,

    // Timer
    timer,
    hasTimer: timerMinutes > 0,

    // Actions
    handleExit,

    // Recipe data
    recipe,
    ingredients: recipe.ingredients,
    portions: recipe.originalPortions,
  };
}

export type CookingModeContext = ReturnType<typeof useCookingMode>;
