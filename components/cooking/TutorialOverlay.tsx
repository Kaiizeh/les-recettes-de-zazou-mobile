import { View, Pressable } from 'react-native';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import {
  Hand,
  Gauge,
  Timer,
  ChevronRight,
  X,
} from 'lucide-react-native';
import type { TutorialStep } from '@/types/cooking';

interface TutorialOverlayProps {
  onComplete: () => void;
}

const TUTORIAL_STEPS: {
  step: TutorialStep;
  icon: typeof Hand;
  title: string;
  description: string;
}[] = [
  {
    step: 'navigation',
    icon: Hand,
    title: 'Navigation',
    description:
      'Appuyez sur la moitié droite de l\'écran pour passer à l\'étape suivante, ou sur la moitié gauche pour revenir en arrière.',
  },
  {
    step: 'progress',
    icon: Gauge,
    title: 'Barre de progression',
    description:
      'La barre de progression disparaît après 3 secondes. Appuyez n\'importe où sur l\'écran pour la faire réapparaître.',
  },
  {
    step: 'timer',
    icon: Timer,
    title: 'Timer',
    description:
      'Certaines étapes ont un timer. Appuyez dessus pour le démarrer ou le mettre en pause. Vous serez notifié quand le temps est écoulé.',
  },
];

export function TutorialOverlay({ onComplete }: TutorialOverlayProps) {
  const insets = useSafeAreaInsets();
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentStep = TUTORIAL_STEPS[currentIndex];
  const isLastStep = currentIndex === TUTORIAL_STEPS.length - 1;

  const handleNext = () => {
    if (isLastStep) {
      onComplete();
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleSkip = () => {
    onComplete();
  };

  return (
    <Animated.View
      entering={FadeIn}
      exiting={FadeOut}
      className="absolute inset-0 z-50 items-center justify-center bg-black/80"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* Skip button */}
      <Pressable
        onPress={handleSkip}
        className="absolute right-4 top-4 flex-row items-center gap-1 rounded-full bg-white/10 px-4 py-2"
        style={{ marginTop: insets.top }}
        accessibilityRole="button"
        accessibilityLabel="Passer le tutorial"
      >
        <Text className="text-sm text-white/80">Passer</Text>
        <Icon as={X} size={16} className="text-white/80" />
      </Pressable>

      {/* Content */}
      <View className="items-center px-8">
        {/* Icon */}
        <View className="mb-6 h-20 w-20 items-center justify-center rounded-full bg-primary">
          <Icon as={currentStep.icon} size={40} className="text-white" />
        </View>

        {/* Title */}
        <Text
          className="mb-3 text-center text-2xl text-white"
          style={{ fontFamily: 'PlayfairDisplay_700Bold' }}
        >
          {currentStep.title}
        </Text>

        {/* Description */}
        <Text className="mb-8 text-center text-base leading-relaxed text-white/80">
          {currentStep.description}
        </Text>

        {/* Progress dots */}
        <View className="mb-8 flex-row gap-2">
          {TUTORIAL_STEPS.map((_, index) => (
            <View
              key={index}
              className={`h-2 w-2 rounded-full ${
                index === currentIndex ? 'bg-primary' : 'bg-white/30'
              }`}
            />
          ))}
        </View>

        {/* Next button */}
        <Pressable
          onPress={handleNext}
          className="flex-row items-center gap-2 rounded-xl bg-primary px-8 py-4 active:bg-primary/90"
          accessibilityRole="button"
          accessibilityLabel={isLastStep ? 'Commencer' : 'Suivant'}
        >
          <Text className="font-medium text-white">
            {isLastStep ? 'Commencer' : 'Suivant'}
          </Text>
          <Icon as={ChevronRight} size={20} className="text-white" />
        </Pressable>
      </View>
    </Animated.View>
  );
}
