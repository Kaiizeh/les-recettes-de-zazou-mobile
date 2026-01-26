import { View, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Timer } from 'lucide-react-native';
import type { RecipeStep, Ingredient } from '@/types/recipe';
import { CookingIngredientsPanel } from './CookingIngredientsPanel';

interface CookingStepViewProps {
  step: RecipeStep;
  ingredients: Ingredient[];
  portions: number;
  originalPortions: number;
}

export function CookingStepView({
  step,
  ingredients,
  portions,
  originalPortions,
}: CookingStepViewProps) {
  const insets = useSafeAreaInsets();
  // Hauteur de la barre de progression : safe area top + contenu (~48px)
  const progressBarHeight = Math.max(insets.top, 8) + 48;

  return (
    <View className="flex-1 flex-row" style={{ paddingTop: progressBarHeight }}>
      {/* Left panel: Ingredients */}
      <CookingIngredientsPanel
        ingredients={ingredients}
        portions={portions}
        originalPortions={originalPortions}
      />

      {/* Right panel: Step content */}
      <View className="flex-1 flex-row p-4">
        {/* Image (if present) */}
        {step.imageUrl && (
          <View className="mr-4 w-1/3">
            <Image
              source={{ uri: step.imageUrl }}
              className="h-full w-full rounded-xl"
              resizeMode="cover"
            />
          </View>
        )}

        {/* Text content */}
        <ScrollView
          className="flex-1"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 80 }}
        >
          {/* Step number */}
          <View className="mb-3 flex-row items-center">
            <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Text className="text-base font-bold text-white">
                {step.stepNumber}
              </Text>
            </View>
            {step.timerMinutes && (
              <View className="ml-3 flex-row items-center rounded-full bg-amber-100 px-3 py-1">
                <Icon as={Timer} size={14} className="text-amber-600" />
                <Text className="ml-1 text-sm font-medium text-amber-700">
                  {step.timerMinutes} min
                </Text>
              </View>
            )}
          </View>

          {/* Instruction */}
          <Text className="text-lg leading-relaxed text-foreground">
            {step.instruction}
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}
