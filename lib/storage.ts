import AsyncStorage from '@react-native-async-storage/async-storage';
import type { RecipeProgress, RecipeRating } from '@/types/cooking';

export const recipeStorage = {
  getCheckedIngredients: async (recipeId: string): Promise<string[]> => {
    const key = `recipe_${recipeId}_ingredients_checked`;
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : [];
  },

  setCheckedIngredients: async (recipeId: string, ids: string[]) => {
    const key = `recipe_${recipeId}_ingredients_checked`;
    await AsyncStorage.setItem(key, JSON.stringify(ids));
  },

  clearCheckedIngredients: async (recipeId: string) => {
    const key = `recipe_${recipeId}_ingredients_checked`;
    await AsyncStorage.removeItem(key);
  },
};

export const cookingStorage = {
  getProgress: async (recipeId: string): Promise<RecipeProgress | null> => {
    const key = `cooking_progress_${recipeId}`;
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },

  saveProgress: async (progress: RecipeProgress): Promise<void> => {
    const key = `cooking_progress_${progress.recipeId}`;
    await AsyncStorage.setItem(key, JSON.stringify(progress));
  },

  clearProgress: async (recipeId: string): Promise<void> => {
    const key = `cooking_progress_${recipeId}`;
    await AsyncStorage.removeItem(key);
  },

  isTutorialShown: async (): Promise<boolean> => {
    const data = await AsyncStorage.getItem('cooking_tutorial_shown');
    return data === 'true';
  },

  setTutorialShown: async (): Promise<void> => {
    await AsyncStorage.setItem('cooking_tutorial_shown', 'true');
  },

  saveRating: async (rating: RecipeRating): Promise<void> => {
    const key = `recipe_${rating.recipeId}_rating`;
    await AsyncStorage.setItem(key, JSON.stringify(rating));
  },

  getRating: async (recipeId: string): Promise<RecipeRating | null> => {
    const key = `recipe_${recipeId}_rating`;
    const data = await AsyncStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  },
};
