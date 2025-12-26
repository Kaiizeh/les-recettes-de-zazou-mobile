import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { StepItem } from './StepItem';
import type { RecipeStep } from '@/types/recipe';

interface StepsListProps {
  steps: RecipeStep[];
}

export function StepsList({ steps }: StepsListProps) {
  if (steps.length === 0) {
    return (
      <View className="px-4 py-4">
        <Text className="text-center text-muted-foreground">
          Aucune etape disponible pour cette recette.
        </Text>
      </View>
    );
  }

  return (
    <View className="px-4 py-4">
      {/* Header */}
      <Text className="mb-4 text-xl font-bold text-foreground">
        Preparation
      </Text>

      {/* Steps list */}
      <View className="gap-6">
        {steps.map((step) => (
          <StepItem key={step.id} step={step} />
        ))}
      </View>
    </View>
  );
}
