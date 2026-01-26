import { View, Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  FadeIn,
  FadeOut,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { X } from 'lucide-react-native';
import { CookingTimer } from './CookingTimer';
import type { TimerState } from '@/types/cooking';
import { cn } from '@/lib/utils';

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
  isVisible: boolean;
  onClose: () => void;
  onStepPress: (index: number) => void;
  timer?: {
    formattedTime: string;
    state: TimerState;
    onPress: () => void;
  };
}

export function ProgressBar({
  currentStep,
  totalSteps,
  isVisible,
  onClose,
  onStepPress,
  timer,
}: ProgressBarProps) {
  const insets = useSafeAreaInsets();

  if (!isVisible) return null;

  return (
    <Animated.View
      entering={FadeIn.duration(200)}
      exiting={FadeOut.duration(200)}
      style={{ paddingTop: Math.max(insets.top, 8) }}
      className="absolute left-0 right-0 top-0 z-50 flex-row items-center justify-between bg-background/90 px-4 pb-3"
    >
      {/* Close button */}
      <Pressable
        onPress={onClose}
        className="h-10 w-10 items-center justify-center rounded-full bg-card"
        accessibilityRole="button"
        accessibilityLabel="Quitter la recette"
      >
        <Icon as={X} size={20} className="text-foreground" />
      </Pressable>

      {/* Progress indicators */}
      <View className="flex-1 flex-row items-center justify-center gap-1 px-4">
        {Array.from({ length: totalSteps }).map((_, index) => (
          <Pressable
            key={index}
            onPress={() => onStepPress(index)}
            accessibilityRole="button"
            accessibilityLabel={`Aller à l'étape ${index + 1}`}
          >
            <View
              className={cn(
                'h-2 w-2 rounded-full',
                index <= currentStep ? 'bg-primary' : 'bg-muted'
              )}
            />
          </Pressable>
        ))}
      </View>

      {/* Step counter */}
      <Text className="mr-3 text-sm text-muted-foreground">
        Étape {currentStep + 1}/{totalSteps}
      </Text>

      {/* Timer (if present) */}
      {timer && (
        <CookingTimer
          formattedTime={timer.formattedTime}
          state={timer.state}
          onPress={timer.onPress}
        />
      )}
    </Animated.View>
  );
}
