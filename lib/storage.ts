import AsyncStorage from '@react-native-async-storage/async-storage';

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
