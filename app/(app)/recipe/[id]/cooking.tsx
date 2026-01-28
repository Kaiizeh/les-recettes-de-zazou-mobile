import { View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useState, useEffect } from 'react';
import { Text } from '@/components/ui/text';
import { CookingModeContainer } from '@/components/cooking/CookingModeContainer';
import { TutorialOverlay } from '@/components/cooking/TutorialOverlay';
import { MOCK_RECIPES } from '@/data/mockRecipes';
import { useRecipeProgress } from '@/hooks/useRecipeProgress';
import { cookingStorage } from '@/lib/storage';
import { ResumePrompt } from '@/components/cooking/ResumePrompt';

export default function CookingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const recipe = MOCK_RECIPES.find((r) => r.id === id);

  const { savedProgress, clearProgress, isLoading } = useRecipeProgress(id!);
  const [showResumePrompt, setShowResumePrompt] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [initialStepIndex, setInitialStepIndex] = useState(0);
  const [initialTimerSeconds, setInitialTimerSeconds] = useState<number | undefined>();
  const [isReady, setIsReady] = useState(false);

  // Check for saved progress and tutorial state
  useEffect(() => {
    if (isLoading) return;

    const checkState = async () => {
      const tutorialShown = await cookingStorage.isTutorialShown();

      if (savedProgress) {
        setShowResumePrompt(true);
      } else if (!tutorialShown) {
        setShowTutorial(true);
      } else {
        setIsReady(true);
      }
    };

    checkState();
  }, [isLoading, savedProgress]);

  const handleResume = () => {
    if (savedProgress) {
      setInitialStepIndex(savedProgress.currentStepIndex);
      setInitialTimerSeconds(savedProgress.timerRemainingSeconds);
    }
    setShowResumePrompt(false);
    setIsReady(true);
  };

  const handleRestart = async () => {
    await clearProgress();
    setInitialStepIndex(0);
    setInitialTimerSeconds(undefined);
    setShowResumePrompt(false);
    setIsReady(true);
  };

  const handleTutorialComplete = async () => {
    await cookingStorage.setTutorialShown();
    setShowTutorial(false);
    setIsReady(true);
  };

  const handleComplete = () => {
    router.replace(`/recipe/${id}/completion`);
  };

  const handleExit = () => {
    router.back();
  };

  if (!recipe) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="text-lg text-muted-foreground">Recette introuvable</Text>
      </View>
    );
  }

  if (recipe.steps.length === 0) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="text-lg text-muted-foreground">
          Cette recette n'a pas d'etapes
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <StatusBar hidden />
      <Stack.Screen options={{ headerShown: false }} />

      {/* Resume prompt */}
      {showResumePrompt && (
        <ResumePrompt
          stepNumber={savedProgress!.currentStepIndex + 1}
          onResume={handleResume}
          onRestart={handleRestart}
        />
      )}

      {/* Tutorial overlay */}
      {showTutorial && (
        <TutorialOverlay onComplete={handleTutorialComplete} />
      )}

      {/* Cooking mode */}
      {isReady && (
        <CookingModeContainer
          recipe={recipe}
          initialStepIndex={initialStepIndex}
          initialTimerSeconds={initialTimerSeconds}
          onComplete={handleComplete}
          onExit={handleExit}
        />
      )}
    </View>
  );
}
