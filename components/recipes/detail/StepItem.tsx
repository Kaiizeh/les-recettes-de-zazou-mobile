import { View, Image } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Timer } from 'lucide-react-native';
import type { RecipeStep } from '@/types/recipe';

interface StepItemProps {
  step: RecipeStep;
}

export function StepItem({ step }: StepItemProps) {
  return (
    <View className="flex-row gap-4">
      {/* Step number */}
      <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
        <Text className="text-sm font-bold text-white">{step.stepNumber}</Text>
      </View>

      {/* Step content */}
      <View className="flex-1 gap-3">
        <Text className="text-base leading-relaxed text-foreground">
          {step.instruction}
        </Text>

        {/* Timer if present */}
        {step.timerMinutes && (
          <View className="flex-row items-center gap-1.5 rounded-lg bg-amber-100 px-3 py-2 dark:bg-amber-900/30">
            <Icon as={Timer} size={16} className="text-amber-600" />
            <Text className="text-sm font-medium text-amber-700 dark:text-amber-400">
              {step.timerMinutes} min
            </Text>
          </View>
        )}

        {/* Image if present */}
        {step.imageUrl && (
          <Image
            source={{ uri: step.imageUrl }}
            className="h-48 w-full rounded-xl"
            resizeMode="cover"
          />
        )}
      </View>
    </View>
  );
}
