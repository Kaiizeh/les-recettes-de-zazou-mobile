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
import { ArrowLeft, Bookmark } from 'lucide-react-native';

interface RecipeDetailHeaderProps {
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

export function RecipeDetailHeader({
  isFavorite,
  onToggleFavorite,
}: RecipeDetailHeaderProps) {
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handleFavoritePress = () => {
    scale.value = withSequence(
      withTiming(1.15, { duration: 80, easing: Easing.out(Easing.ease) }),
      withTiming(0.95, { duration: 60, easing: Easing.inOut(Easing.ease) }),
      withTiming(1, { duration: 80, easing: Easing.out(Easing.ease) })
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
        className="h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-black/50"
        accessibilityRole="button"
        accessibilityLabel="Retour"
      >
        <Icon as={ArrowLeft} size={24} className="text-foreground" />
      </Pressable>

      {/* Bookmark button */}
      <Animated.View style={animatedStyle}>
        <Pressable
          onPress={handleFavoritePress}
          className="h-12 w-12 items-center justify-center rounded-xl bg-white dark:bg-black/50"
          accessibilityRole="button"
          accessibilityLabel={
            isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'
          }
        >
          <Icon
            as={Bookmark}
            size={22}
            className={isFavorite ? 'text-primary' : 'text-foreground'}
            fill={isFavorite ? '#2D5A4A' : 'none'}
          />
        </Pressable>
      </Animated.View>
    </View>
  );
}
