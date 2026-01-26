import { View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withSpring,
} from 'react-native-reanimated';
import { Icon } from '@/components/ui/icon';
import { Star } from 'lucide-react-native';
import { triggerTapHaptic } from '@/lib/haptics';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  size?: number;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

function AnimatedStar({
  filled,
  onPress,
  size,
}: {
  filled: boolean;
  onPress: () => void;
  size: number;
}) {
  const scale = useSharedValue(1);

  const handlePress = async () => {
    await triggerTapHaptic();
    scale.value = withSequence(
      withSpring(1.3, { damping: 10, stiffness: 400 }),
      withSpring(1, { damping: 10, stiffness: 400 })
    );
    onPress();
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <AnimatedPressable
      style={animatedStyle}
      onPress={handlePress}
      accessibilityRole="button"
    >
      <Icon
        as={Star}
        size={size}
        className={filled ? 'text-amber-400' : 'text-muted'}
        fill={filled ? '#FBBF24' : 'transparent'}
      />
    </AnimatedPressable>
  );
}

export function StarRating({ value, onChange, size = 32 }: StarRatingProps) {
  return (
    <View className="flex-row gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <AnimatedStar
          key={star}
          filled={star <= value}
          onPress={() => onChange(star)}
          size={size}
        />
      ))}
    </View>
  );
}
