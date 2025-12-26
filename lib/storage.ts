import { MMKV } from 'react-native-mmkv';

export const storage = new MMKV();

export const recipeStorage = {
  getCheckedIngredients: (recipeId: string): string[] => {
    const key = `recipe_${recipeId}_ingredients_checked`;
    const data = storage.getString(key);
    return data ? JSON.parse(data) : [];
  },

  setCheckedIngredients: (recipeId: string, ids: string[]) => {
    const key = `recipe_${recipeId}_ingredients_checked`;
    storage.set(key, JSON.stringify(ids));
  },

  clearCheckedIngredients: (recipeId: string) => {
    const key = `recipe_${recipeId}_ingredients_checked`;
    storage.delete(key);
  },
};
