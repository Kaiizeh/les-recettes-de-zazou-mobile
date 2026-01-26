import { View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import { triggerTapHaptic } from '@/lib/haptics';

interface StepNavigatorProps {
  onPrevious: () => void;
  onNext: () => void;
  onTap: () => void;
  canGoPrevious: boolean;
  isLastStep: boolean;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function StepNavigator({
  onPrevious,
  onNext,
  onTap,
  canGoPrevious,
  isLastStep,
}: StepNavigatorProps) {
  const leftOpacity = useSharedValue(0);
  const rightOpacity = useSharedValue(0);

  const handleLeftTap = async () => {
    if (!canGoPrevious) {
      onTap();
      return;
    }
    await triggerTapHaptic();
    leftOpacity.value = withSequence(
      withTiming(0.3, { duration: 100 }),
      withTiming(0, { duration: 200 })
    );
    onPrevious();
  };

  const handleRightTap = async () => {
    await triggerTapHaptic();
    rightOpacity.value = withSequence(
      withTiming(0.3, { duration: 100 }),
      withTiming(0, { duration: 200 })
    );
    onNext();
  };

  const leftAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0, 0, 0, ${leftOpacity.value})`,
  }));

  const rightAnimatedStyle = useAnimatedStyle(() => ({
    backgroundColor: `rgba(0, 0, 0, ${rightOpacity.value})`,
  }));

  return (
    <>
      {/* Tap zones (invisible, covering entire screen halves) */}
      <AnimatedPressable
        style={leftAnimatedStyle}
        onPress={handleLeftTap}
        className="absolute bottom-0 left-0 top-0 w-1/2"
        accessibilityRole="button"
        accessibilityLabel="Étape précédente"
      />
      <AnimatedPressable
        style={rightAnimatedStyle}
        onPress={handleRightTap}
        className="absolute bottom-0 right-0 top-0 w-1/2"
        accessibilityRole="button"
        accessibilityLabel={isLastStep ? 'Terminer la recette' : 'Étape suivante'}
      />

      {/* Visible navigation buttons at bottom */}
      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between px-4 pb-4">
        {/* Previous button */}
        <Pressable
          onPress={canGoPrevious ? onPrevious : undefined}
          disabled={!canGoPrevious}
          className={cn(
            'flex-row items-center gap-2 rounded-xl px-5 py-3',
            canGoPrevious ? 'bg-card active:bg-card/80' : 'opacity-0'
          )}
          accessibilityRole="button"
          accessibilityLabel="Étape précédente"
          accessibilityState={{ disabled: !canGoPrevious }}
        >
          <Icon
            as={ChevronLeft}
            size={20}
            className={canGoPrevious ? 'text-foreground' : 'text-muted-foreground'}
          />
          <Text
            className={cn(
              'font-medium',
              canGoPrevious ? 'text-foreground' : 'text-muted-foreground'
            )}
          >
            Précédent
          </Text>
        </Pressable>

        {/* Next/Finish button */}
        <Pressable
          onPress={onNext}
          className={cn(
            'flex-row items-center gap-2 rounded-xl px-5 py-3',
            isLastStep ? 'bg-success active:bg-success/90' : 'bg-primary active:bg-primary/90'
          )}
          accessibilityRole="button"
          accessibilityLabel={isLastStep ? 'Terminer la recette' : 'Étape suivante'}
        >
          <Text className="font-medium text-white">
            {isLastStep ? 'Terminer' : 'Suivant'}
          </Text>
          <Icon
            as={isLastStep ? Check : ChevronRight}
            size={20}
            className="text-white"
          />
        </Pressable>
      </View>
    </>
  );
}
