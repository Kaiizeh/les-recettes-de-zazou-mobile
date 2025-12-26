import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useLocalSearchParams, Stack } from 'expo-router';
import { useState } from 'react';
import { Text } from '@/components/ui/text';
import { RecipeDetailHeader } from '@/components/recipes/detail/RecipeDetailHeader';
import { RecipeHeroImage } from '@/components/recipes/detail/RecipeHeroImage';
import { RecipeInfoSection } from '@/components/recipes/detail/RecipeInfoSection';
import { PortionsSelector } from '@/components/recipes/detail/PortionsSelector';
import { IngredientsList } from '@/components/recipes/detail/IngredientsList';
import { StepsList } from '@/components/recipes/detail/StepsList';
import { FloatingCTAButton } from '@/components/recipes/detail/FloatingCTAButton';
import { MOCK_RECIPES } from '@/data/mockRecipes';

export default function RecipeDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const recipe = MOCK_RECIPES.find((r) => r.id === id);

  const [portions, setPortions] = useState(recipe?.originalPortions ?? 4);
  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite ?? false);
  const scrollY = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: (event) => {
      scrollY.value = event.contentOffset.y;
    },
  });

  const handleToggleFavorite = () => {
    setIsFavorite((prev) => !prev);
  };

  if (!recipe) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="text-lg text-muted-foreground">
          Recette introuvable
        </Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-background">
      <Stack.Screen options={{ headerShown: false }} />

      {/* Header overlay */}
      <RecipeDetailHeader
        title={recipe.name}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />

      {/* Scrollable content */}
      <Animated.ScrollView
        onScroll={scrollHandler}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/* Hero image */}
        <RecipeHeroImage imageUrl={recipe.imageUrl} scrollY={scrollY} />

        {/* Info section */}
        <RecipeInfoSection
          prepTimeMinutes={recipe.prepTimeMinutes}
          cookTimeMinutes={recipe.cookTimeMinutes}
          rating={recipe.rating}
          ratingCount={recipe.ratingCount}
          difficulty={recipe.difficulty}
          isThermomixCompatible={recipe.isThermomixCompatible}
        />

        {/* Portions selector */}
        <PortionsSelector value={portions} onChange={setPortions} />

        {/* Description */}
        {recipe.description && (
          <View className="px-4 py-4">
            <Text className="text-base leading-relaxed text-muted-foreground">
              {recipe.description}
            </Text>
          </View>
        )}

        {/* Ingredients */}
        <IngredientsList
          ingredients={recipe.ingredients}
          portions={portions}
          originalPortions={recipe.originalPortions}
          recipeId={recipe.id}
        />

        {/* Steps */}
        <StepsList steps={recipe.steps} />
      </Animated.ScrollView>

      {/* Floating CTA */}
      <FloatingCTAButton disabled />
    </View>
  );
}
