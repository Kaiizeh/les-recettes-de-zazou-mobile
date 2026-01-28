import { View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
} from 'react-native-reanimated';
import { useLocalSearchParams, Stack, useRouter } from 'expo-router';
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
  const router = useRouter();
  const recipe = MOCK_RECIPES.find((r) => r.id === id);

  const [portions, setPortions] = useState(recipe?.originalPortions ?? 4);
  const [isFavorite, setIsFavorite] = useState(recipe?.isFavorite ?? false);
  const scrollY = useSharedValue(0);

  const hasSteps = (recipe?.steps.length ?? 0) > 0;

  const handleStartCooking = () => {
    router.push(`/recipe/${id}/cooking`);
  };

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

        {/* Content container with bottom sheet effect */}
        <View className="-mt-6 rounded-t-3xl bg-background">
          {/* Handle bar */}
          <View className="mx-auto mt-3 mb-4 h-1 w-10 rounded-full bg-muted" />

          {/* Title */}
          <Text
            className="mb-3 px-4 text-2xl text-foreground"
            style={{ fontFamily: 'PlayfairDisplay_700Bold' }}
          >
            {recipe.name}
          </Text>

          {/* Info section */}
          <RecipeInfoSection
            totalTimeMinutes={recipe.totalTimeMinutes}
            difficulty={recipe.difficulty}
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
        </View>
      </Animated.ScrollView>

      {/* Floating CTA */}
      <FloatingCTAButton disabled={!hasSteps} onPress={handleStartCooking} />
    </View>
  );
}
