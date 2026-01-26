import { View } from 'react-native';
import { useKeepAwake } from 'expo-keep-awake';
import { useState } from 'react';
import type { Recipe } from '@/types/recipe';
import { useLandscapeOrientation } from '@/hooks/useScreenOrientation';
import { useCookingMode } from '@/hooks/useCookingMode';
import { ProgressBar } from './ProgressBar';
import { CookingStepView } from './CookingStepView';
import { StepNavigator } from './StepNavigator';
import { ExitConfirmationModal } from './ExitConfirmationModal';

interface CookingModeContainerProps {
  recipe: Recipe;
  initialStepIndex?: number;
  initialTimerSeconds?: number;
  onComplete: () => void;
  onExit: () => void;
}

export function CookingModeContainer({
  recipe,
  initialStepIndex,
  initialTimerSeconds,
  onComplete,
  onExit,
}: CookingModeContainerProps) {
  // Keep screen awake
  useKeepAwake();

  // Force landscape orientation
  useLandscapeOrientation();

  // Exit confirmation modal
  const [showExitModal, setShowExitModal] = useState(false);

  const {
    currentStepIndex,
    currentStep,
    totalSteps,
    isFirstStep,
    isLastStep,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isProgressBarVisible,
    handleScreenTap,
    timer,
    hasTimer,
    handleExit,
    ingredients,
    portions,
  } = useCookingMode({
    recipe,
    initialStepIndex,
    initialTimerSeconds,
    onComplete,
    onExit,
  });

  const handleClosePress = () => {
    setShowExitModal(true);
  };

  const handleConfirmExit = () => {
    setShowExitModal(false);
    handleExit();
  };

  const handleCancelExit = () => {
    setShowExitModal(false);
  };

  if (!currentStep) {
    return null;
  }

  return (
    <View className="flex-1 bg-background">
      {/* Progress bar (auto-hide) */}
      <ProgressBar
        currentStep={currentStepIndex}
        totalSteps={totalSteps}
        isVisible={isProgressBarVisible}
        onClose={handleClosePress}
        onStepPress={goToStep}
        timer={
          hasTimer
            ? {
                formattedTime: timer.formattedTime,
                state: timer.state,
                onPress: timer.togglePlayPause,
              }
            : undefined
        }
      />

      {/* Step content */}
      <CookingStepView
        step={currentStep}
        ingredients={ingredients}
        portions={portions}
        originalPortions={recipe.originalPortions}
      />

      {/* Navigation (tap zones + buttons) */}
      <StepNavigator
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onTap={handleScreenTap}
        canGoPrevious={!isFirstStep}
        isLastStep={isLastStep}
      />

      {/* Exit confirmation modal */}
      <ExitConfirmationModal
        visible={showExitModal}
        onCancel={handleCancelExit}
        onConfirm={handleConfirmExit}
      />
    </View>
  );
}
