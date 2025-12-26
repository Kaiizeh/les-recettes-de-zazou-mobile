import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { SearchBar } from '@/components/recipes/SearchBar';
import { FilterTags } from '@/components/recipes/FilterTags';
import { RecipeList } from '@/components/recipes/RecipeList';
import { useRecipeFilters } from '@/hooks/useRecipeFilters';
import { Stack } from 'expo-router';
import { MoonStarIcon, SunIcon } from 'lucide-react-native';
import { useColorScheme } from 'nativewind';
import { useState, useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import type { Recipe } from '@/types/recipe';

export default function HomeScreen() {
  const { colorScheme } = useColorScheme();
  const [isLoading, setIsLoading] = useState(true);

  const {
    searchQuery,
    setSearchQuery,
    activeTags,
    toggleTag,
    toggleFavorite,
    clearFilters,
    filteredRecipes,
  } = useRecipeFilters();

  // Simulate initial loading
  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleRecipePress = (recipe: Recipe) => {
    // TODO: Navigate to recipe detail
    console.log('Navigate to recipe:', recipe.id);
  };

  return (
    <SafeAreaView className="flex-1 bg-background">
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <Text className="text-2xl font-bold text-foreground">Recettes</Text>
          ),
          headerRight: () => <ThemeToggle />,
          headerStyle: {
            backgroundColor: colorScheme === 'dark' ? '#121212' : '#F5F1EB',
          },
          headerShadowVisible: false,
        }}
      />

      <View className="flex-1">
        {/* Search bar */}
        <View className="px-4 pb-3 pt-2">
          <SearchBar value={searchQuery} onChangeText={setSearchQuery} />
        </View>

        {/* Filter tags */}
        <View className="pb-4">
          <FilterTags activeTags={activeTags} onToggleTag={toggleTag} />
        </View>

        {/* Recipe list */}
        <RecipeList
          recipes={filteredRecipes}
          isLoading={isLoading}
          onRecipePress={handleRecipePress}
          onToggleFavorite={toggleFavorite}
          onResetFilters={clearFilters}
        />
      </View>
    </SafeAreaView>
  );
}

const THEME_ICONS = {
  light: SunIcon,
  dark: MoonStarIcon,
};

function ThemeToggle() {
  const { colorScheme, toggleColorScheme } = useColorScheme();

  return (
    <Button
      onPressIn={toggleColorScheme}
      size="icon"
      variant="ghost"
      className="ios:size-9 web:mx-4 rounded-full"
    >
      <Icon as={THEME_ICONS[colorScheme ?? 'light']} className="size-5" />
    </Button>
  );
}
