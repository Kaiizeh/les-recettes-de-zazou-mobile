import { View, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { RotateCcw } from 'lucide-react-native';
import { IngredientItem } from './IngredientItem';
import { useIngredientChecks } from '@/hooks/useIngredientChecks';
import type { Ingredient } from '@/types/recipe';
import { useMemo } from 'react';

interface IngredientsListProps {
  ingredients: Ingredient[];
  portions: number;
  originalPortions: number;
  recipeId: string;
}

export function IngredientsList({
  ingredients,
  portions,
  originalPortions,
  recipeId,
}: IngredientsListProps) {
  const { isChecked, toggleIngredient, clearAll, checkedIds } =
    useIngredientChecks(recipeId);

  const scaledIngredients = useMemo(() => {
    return ingredients.map((ing) => ({
      ...ing,
      scaledQuantity: (ing.quantity / originalPortions) * portions,
    }));
  }, [ingredients, portions, originalPortions]);

  const hasCheckedItems = checkedIds.size > 0;

  if (ingredients.length === 0) {
    return (
      <View className="px-4 py-4">
        <Text className="text-center text-muted-foreground">
          Aucun ingredient disponible pour cette recette.
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 py-4">
      {/* Header */}
      <View className="mb-3 flex-row items-center justify-between">
        <Text className="text-xl font-bold text-foreground">Ingredients</Text>
        {hasCheckedItems && (
          <Pressable
            onPress={clearAll}
            className="flex-row items-center gap-1.5"
            accessibilityRole="button"
            accessibilityLabel="Tout decocher"
          >
            <Icon as={RotateCcw} size={16} className="text-primary" />
            <Text className="text-sm text-primary">Reinitialiser</Text>
          </Pressable>
        )}
      </View>

      {/* Ingredients list */}
      <View className="gap-1">
        {scaledIngredients.map((ingredient) => (
          <IngredientItem
            key={ingredient.id}
            ingredient={ingredient}
            scaledQuantity={ingredient.scaledQuantity}
            isChecked={isChecked(ingredient.id)}
            onToggle={() => toggleIngredient(ingredient.id)}
          />
        ))}
      </View>
    </View>
  );
}
