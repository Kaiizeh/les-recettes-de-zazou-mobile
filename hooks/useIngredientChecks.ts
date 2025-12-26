import { useState, useCallback, useEffect } from 'react';
import { recipeStorage } from '@/lib/storage';

export function useIngredientChecks(recipeId: string) {
  const [checkedIds, setCheckedIds] = useState<Set<string>>(new Set());
  const [isLoading, setIsLoading] = useState(true);

  // Charger depuis AsyncStorage au montage
  useEffect(() => {
    recipeStorage.getCheckedIngredients(recipeId).then((stored) => {
      setCheckedIds(new Set(stored));
      setIsLoading(false);
    });
  }, [recipeId]);

  const toggleIngredient = useCallback(
    (ingredientId: string) => {
      setCheckedIds((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(ingredientId)) {
          newSet.delete(ingredientId);
        } else {
          newSet.add(ingredientId);
        }
        // Persister de manière async
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

  return { checkedIds, toggleIngredient, clearAll, isChecked, isLoading };
}
