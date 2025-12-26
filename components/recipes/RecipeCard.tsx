import { View, Pressable, useWindowDimensions } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
  Easing,
  interpolate,
  SharedValue,
} from 'react-native-reanimated';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Clock, Heart, Bot, Download, Star } from 'lucide-react-native';
import type { Recipe } from '@/types/recipe';
import { cn } from '@/lib/utils';

interface RecipeCardProps {
  recipe: Recipe;
  onPress: () => void;
  onToggleFavorite: (id: string) => void;
  scrollY: SharedValue<number>;
  index: number;
}

const DIFFICULTY_STYLES = {
  Facile: { badge: 'bg-primary/10', text: 'text-primary' },
  Moyen: { badge: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-600 dark:text-orange-400' },
  Difficile: { badge: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-600 dark:text-red-400' },
};

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h${mins}` : `${hours}h`;
}

// Constantes pour le calcul du parallax
const CARD_HEIGHT = 280; // Hauteur approximative d'une carte (image + contenu)
const CARD_GAP = 16;
const PARALLAX_AMOUNT = 15; // Pixels de déplacement parallax

export function RecipeCard({ recipe, onPress, onToggleFavorite, scrollY, index }: RecipeCardProps) {
  const { height: screenHeight } = useWindowDimensions();
  const difficultyStyle = DIFFICULTY_STYLES[recipe.difficulty];

  // Animation blob/morphing pour le bouton favoris
  const scale = useSharedValue(1);
  const rotate = useSharedValue(0);

  // Animation parallax pour l'image
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const cardOffset = index * (CARD_HEIGHT + CARD_GAP);
    const translateY = interpolate(
      scrollY.value,
      [cardOffset - screenHeight, cardOffset + CARD_HEIGHT],
      [-PARALLAX_AMOUNT, PARALLAX_AMOUNT]
    );
    return {
      transform: [{ translateY }, { scale: 1.1 }],
    };
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }, { rotate: `${rotate.value}deg` }],
  }));

  const handleFavoritePress = (e: any) => {
    e.stopPropagation?.();

    // Animation blob rapide: scale up puis down avec rotation légère
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

    onToggleFavorite(recipe.id);
  };

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <Card className="overflow-hidden rounded-2xl">
        {/* Image container with 16:10 aspect ratio and overflow hidden for parallax */}
        <View className="relative overflow-hidden" style={{ aspectRatio: 16 / 10 }}>
          <Animated.Image
            source={{ uri: recipe.imageUrl }}
            className="absolute inset-0 h-full w-full"
            resizeMode="cover"
            style={imageAnimatedStyle}
          />
          {/* Favorite button with blob/morphing animation */}
          <Animated.View style={animatedStyle} className="absolute right-3 top-3">
            <Pressable
              onPress={handleFavoritePress}
              className="h-11 w-11 items-center justify-center rounded-full bg-white/90 dark:bg-black/50"
              accessibilityRole="button"
              accessibilityLabel={
                recipe.isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris'
              }
            >
              <Icon
                as={Heart}
                size={22}
                className={recipe.isFavorite ? 'text-red-500' : 'text-muted-foreground'}
                fill={recipe.isFavorite ? '#ef4444' : 'none'}
              />
            </Pressable>
          </Animated.View>
        </View>

        <CardContent className="gap-3 p-4">
          {/* Recipe name */}
          <Text className="text-lg font-semibold text-foreground" numberOfLines={2}>
            {recipe.name}
          </Text>

          {/* Badges row */}
          <View className="flex-row flex-wrap gap-2">
            {/* Time badge */}
            <Badge variant="secondary" className="flex-row gap-1">
              <Icon as={Clock} size={14} className="text-muted-foreground" />
              <Text className="text-xs text-muted-foreground">
                {formatTime(recipe.totalTimeMinutes)}
              </Text>
            </Badge>

            {/* Difficulty badge */}
            <Badge className={cn('flex-row', difficultyStyle.badge)}>
              <Text className={cn('text-xs font-medium', difficultyStyle.text)}>
                {recipe.difficulty}
              </Text>
            </Badge>

            {/* Rating */}
            <View className="flex-row items-center gap-1">
              <Icon as={Star} size={14} className="text-amber-500" fill="#f59e0b" />
              <Text className="text-xs text-muted-foreground">
                {recipe.rating.toFixed(1)}
              </Text>
            </View>
          </View>

          {/* Bottom badges row */}
          {(recipe.isThermomixCompatible || recipe.isCached) && (
            <View className="flex-row gap-2">
              {recipe.isThermomixCompatible && (
                <Badge variant="outline" className="flex-row gap-1">
                  <Icon as={Bot} size={14} className="text-primary" />
                  <Text className="text-xs text-muted-foreground">Thermomix</Text>
                </Badge>
              )}
              {recipe.isCached && (
                <Badge variant="outline" className="flex-row gap-1">
                  <Icon as={Download} size={14} className="text-muted-foreground" />
                  <Text className="text-xs text-muted-foreground">Hors ligne</Text>
                </Badge>
              )}
            </View>
          )}
        </CardContent>
      </Card>
    </Pressable>
  );
}
