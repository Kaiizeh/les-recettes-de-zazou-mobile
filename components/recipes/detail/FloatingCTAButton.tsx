import { View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Play } from 'lucide-react-native';
import { useEffect } from 'react';
import { cn } from '@/lib/utils';

interface FloatingCTAButtonProps {
  disabled?: boolean;
  onPress?: () => void;
}

export function FloatingCTAButton({
  disabled = false,
  onPress,
}: FloatingCTAButtonProps) {
  const insets = useSafeAreaInsets();
  const translateY = useSharedValue(100);

  useEffect(() => {
    translateY.value = withTiming(0, { duration: 300 });
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return (
    <Animated.View
      style={[
        animatedStyle,
        { paddingBottom: Math.max(insets.bottom, 16) },
      ]}
      className="absolute bottom-0 left-0 right-0 bg-background/95 px-4 pt-3"
    >
      <Pressable
        onPress={onPress}
        disabled={disabled}
        className={cn(
          'flex-row items-center justify-center gap-2 rounded-xl py-4',
          disabled ? 'bg-muted' : 'bg-primary active:bg-primary/90'
        )}
        accessibilityRole="button"
        accessibilityLabel="Commencer la recette"
        accessibilityState={{ disabled }}
      >
        <Icon
          as={Play}
          size={20}
          className={disabled ? 'text-muted-foreground' : 'text-white'}
          fill={disabled ? 'currentColor' : 'white'}
        />
        <Text
          className={cn(
            'text-base font-semibold',
            disabled ? 'text-muted-foreground' : 'text-white'
          )}
        >
          Commencer la recette
        </Text>
      </Pressable>
    </Animated.View>
  );
}
