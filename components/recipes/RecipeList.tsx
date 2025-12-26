import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { RecipeCard } from './RecipeCard';
import { RecipeListSkeleton } from './RecipeCardSkeleton';
import { EmptyState } from './EmptyState';
import type { Recipe } from '@/types/recipe';

interface RecipeListProps {
  recipes: Recipe[];
  isLoading: boolean;
  onRecipePress: (recipe: Recipe) => void;
  onToggleFavorite: (id: string) => void;
  onResetFilters: () => void;
}

export function RecipeList({
  recipes,
  isLoading,
  onRecipePress,
  onToggleFavorite,
  onResetFilters,
}: RecipeListProps) {
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  if (isLoading) {
    return <RecipeListSkeleton />;
  }

  if (recipes.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  return (
    <Animated.FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 16, paddingHorizontal: 16, paddingBottom: 32 }}
      renderItem={({ item, index }) => (
        <RecipeCard
          recipe={item}
          onPress={() => onRecipePress(item)}
          onToggleFavorite={onToggleFavorite}
          scrollY={scrollY}
          index={index}
        />
      )}
      showsVerticalScrollIndicator={false}
      onScroll={scrollHandler}
      scrollEventThrottle={16}
    />
  );
}
