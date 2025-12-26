import { FlatList, View } from 'react-native';
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
  if (isLoading) {
    return <RecipeListSkeleton />;
  }

  if (recipes.length === 0) {
    return <EmptyState onReset={onResetFilters} />;
  }

  return (
    <FlatList
      data={recipes}
      keyExtractor={(item) => item.id}
      contentContainerStyle={{ gap: 16, paddingHorizontal: 16, paddingBottom: 32 }}
      renderItem={({ item }) => (
        <RecipeCard
          recipe={item}
          onPress={() => onRecipePress(item)}
          onToggleFavorite={onToggleFavorite}
        />
      )}
      showsVerticalScrollIndicator={false}
    />
  );
}
