import { useState, useCallback } from 'react';
import { recipeStorage } from '@/lib/storage';

export function useIngredientChecks(recipeId: string) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(() => {
    const stored = recipeStorage.getCheckedIngredients(recipeId);
    return new Set(stored);
  });

  const toggleIngredient = useCallback(
    (ingredientId: string) => {
      setCheckedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(ingredientId)) {
          newSet.delete(ingredientId);
        } else {
          newSet.add(ingredientId);
        }
        recipeStorage.setCheckedIngredients(recipeId, [...newSet]);
        return newSet;
      });
    },
    [recipeId]
  );

  const clearAll = useCallback(() => {
    setCheckedIds(new Set());
    recipeStorage.clearCheckedIngredients(recipeId);
  }, [recipeId]);

  const isChecked = useCallback(
    (ingredientId: string) => checkedIds.has(ingredientId),
    [checkedIds]
  );

  return { checkedIds, toggleIngredient, clearAll, isChecked };
}
