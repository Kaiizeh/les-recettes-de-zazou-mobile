import { Pressable } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withRepeat,
  withSequence,
  withTiming,
  useSharedValue,
  cancelAnimation,
} from 'react-native-reanimated';
import { useEffect } from 'react';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Timer, Pause, Play } from 'lucide-react-native';
import { cn } from '@/lib/utils';
import type { TimerState } from '@/types/cooking';

interface CookingTimerProps {
  formattedTime: string;
  state: TimerState;
  onPress: () => void;
}

export function CookingTimer({
  formattedTime,
  state,
  onPress,
}: CookingTimerProps) {
  const opacity = useSharedValue(1);

  // Blinking animation when completed
  useEffect(() => {
    if (state === 'completed') {
      opacity.value = withRepeat(
        withSequence(
          withTiming(0.3, { duration: 500 }),
          withTiming(1, { duration: 500 })
        ),
        -1,
        true
      );
    } else {
      cancelAnimation(opacity);
      opacity.value = 1;
    }
  }, [state]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: opacity.value,
  }));

  const getIcon = () => {
    switch (state) {
      case 'running':
        return Pause;
      case 'completed':
        return Timer;
      default:
        return Play;
    }
  };

  const getBackgroundColor = () => {
    switch (state) {
      case 'running':
        return 'bg-primary';
      case 'paused':
        return 'bg-amber-500';
      case 'completed':
        return 'bg-success';
      default:
        return 'bg-card';
    }
  };

  const getTextColor = () => {
    switch (state) {
      case 'running':
      case 'completed':
        return 'text-white';
      case 'paused':
        return 'text-white';
      default:
        return 'text-foreground';
    }
  };

  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel="Timer">
      <Animated.View
        style={animatedStyle}
        className={cn(
          'flex-row items-center gap-2 rounded-full px-4 py-2',
          getBackgroundColor()
        )}
      >
        <Icon as={getIcon()} size={18} className={getTextColor()} />
        <Text className={cn('font-semibold tabular-nums', getTextColor())}>
          {formattedTime}
        </Text>
      </Animated.View>
    </Pressable>
  );
}
