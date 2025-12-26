import { Pressable, View } from 'react-native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSequence,
  withTiming,
} from 'react-native-reanimated';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Check, Square } from 'lucide-react-native';
import type { Ingredient, IngredientUnit } from '@/types/recipe';
import { cn } from '@/lib/utils';

interface IngredientItemProps {
  ingredient: Ingredient;
  scaledQuantity: number;
  isChecked: boolean;
  onToggle: () => void;
}

function formatQuantity(quantity: number): string {
  if (quantity < 0.1) {
    return quantity.toFixed(2);
  }
  if (quantity < 1) {
    return quantity.toFixed(1).replace(/\.0$/, '');
  }
  if (quantity % 1 === 0) {
    return quantity.toString();
  }
  return quantity.toFixed(1).replace(/\.0$/, '');
}

function formatUnit(unit: IngredientUnit): string {
  const unitLabels: Record<IngredientUnit, string> = {
    g: 'g',
    kg: 'kg',
    ml: 'ml',
    L: 'L',
    cl: 'cl',
    'cuillere a soupe': 'c. a s.',
    'cuillere a cafe': 'c. a c.',
    piece: '',
    pincee: 'pincee',
    gousse: 'gousse',
    tranche: 'tranche',
    feuille: 'feuille',
  };
  return unitLabels[unit];
}

export function IngredientItem({
  ingredient,
  scaledQuantity,
  isChecked,
  onToggle,
}: IngredientItemProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePress = () => {
    scale.value = withSequence(
      withTiming(1.05, { duration: 80 }),
      withTiming(1, { duration: 80 })
    );
    onToggle();
  };

  const quantityText = formatQuantity(scaledQuantity);
  const unitText = formatUnit(ingredient.unit);

  return (
    <Pressable
      onPress={handlePress}
      className="flex-row items-center gap-3 py-2"
      accessibilityRole="checkbox"
      accessibilityState={{ checked: isChecked }}
    >
      {/* Checkbox */}
      <Animated.View style={animatedStyle}>
        <View
          className={cn(
            'h-6 w-6 items-center justify-center rounded-md border-2',
            isChecked
              ? 'border-primary bg-primary'
              : 'border-muted-foreground bg-transparent'
          )}
        >
          {isChecked && <Icon as={Check} size={16} className="text-white" />}
        </View>
      </Animated.View>

      {/* Ingredient text */}
      <View className="flex-1 flex-row flex-wrap">
        <Text
          className={cn(
            'text-base',
            isChecked
              ? 'text-muted-foreground line-through opacity-60'
              : 'text-foreground'
          )}
        >
          <Text className="font-medium">
            {quantityText}
            {unitText ? ` ${unitText}` : ''}
          </Text>
          {' '}
          {ingredient.name}
          {ingredient.isOptional && (
            <Text className="text-muted-foreground"> (optionnel)</Text>
          )}
        </Text>
      </View>
    </Pressable>
  );
}
