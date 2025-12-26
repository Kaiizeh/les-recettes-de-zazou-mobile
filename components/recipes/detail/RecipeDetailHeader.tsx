import { View, Pressable } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ArrowLeft, Heart } from 'lucide-react-native';

interface RecipeDetailHeaderProps {
  title: string;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function RecipeDetailHeader({
  title,
  isFavorite,
  onToggleFavorite,
}: RecipeDetailHeaderProps) {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  const handleFavoritePress = () => {
    scale.value = withSequence(
      withTiming(1.15, { duration: 80, easing: Easing.out(Easing.ease) }),
      withTiming(0.95, { duration: 60, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 80, easing: Easing.out(Easing.ease) })
    );

    rotate.value = withSequence(
      withTiming(6, { duration: 60, easing: Easing.out(Easing.ease) }),
      withTiming(-6, { duration: 60, easing: Easing.inOut(Easing.ease) }),
      withTiming(0, { duration: 60, easing: Easing.out(Easing.ease) })
    );

    onToggleFavorite();
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <View
      className="absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between px-4"
      style={{ paddingTop: insets.top + 8 }}
    >
      {/* Back button */}
      <Pressable
        onPress={handleBack}
        className="h-11 w-11 items-center justify-center rounded-full bg-white/90 dark:bg-black/50"
        accessibilityRole="button"
        accessibilityLabel="Retour"
      >
        <Icon as={ArrowLeft} size={24} className="text-foreground" />
      </Pressable>

      {/* Title */}
      <View className="mx-4 flex-1">
        <Text
          className="text-center text-lg font-semibold text-foreground"
          numberOfLines={1}
          style={{
            textShadowColor: 'rgba(255, 255, 255, 0.8)',
            textShadowOffset: { width: 0, height: 1 },
            textShadowRadius: 2,
          }}
        >
          {title}
        </Text>
      </View>

      {/* Favorite button */}
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handleFavoritePress}
          className="h-11 w-11 items-center justify-center rounded-full bg-white/90 dark:bg-black/50"
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'
          }
        >
          <Icon
            as={Heart}
            size={22}
            className={isFavorite ? 'text-red-500' : 'text-muted-foreground'}
            fill={isFavorite ? '#ef4444' : 'none'}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}
