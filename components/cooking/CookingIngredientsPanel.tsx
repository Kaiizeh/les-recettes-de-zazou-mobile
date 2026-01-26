import { View, ScrollView } from 'react-native';
import { Text } from '@/components/ui/text';
import type { Ingredient } from '@/types/recipe';

interface CookingIngredientsPanelProps {
  ingredients: Ingredient[];
  portions: number;
  originalPortions: number;
}

const UNIT_ABBREVIATIONS: Record<string, string> = {
  gramme: 'g',
  grammes: 'g',
  kilogramme: 'kg',
  kilogrammes: 'kg',
  litre: 'L',
  litres: 'L',
  millilitre: 'mL',
  millilitres: 'mL',
  centilitre: 'cL',
  centilitres: 'cL',
  'cuillère à soupe': 'c.s.',
  'cuillères à soupe': 'c.s.',
  'cuillère à café': 'c.c.',
  'cuillères à café': 'c.c.',
  pièce: '',
  pièces: '',
  unité: '',
  unités: '',
};

function formatQuantity(quantity: number): string {
  if (quantity === 0) return '';
  if (quantity < 1) {
    return quantity.toFixed(2).replace(/\.?0+$/, '');
  }
  if (Number.isInteger(quantity)) {
    return quantity.toString();
  }
  return quantity.toFixed(1).replace(/\.0$/, '');
}

function getUnitAbbreviation(unit: string): string {
  return UNIT_ABBREVIATIONS[unit.toLowerCase()] ?? unit;
}

export function CookingIngredientsPanel({
  ingredients,
  portions,
  originalPortions,
}: CookingIngredientsPanelProps) {
  const scale = portions / originalPortions;

  return (
    <View className="h-full w-48 border-r border-border bg-card/50">
      <Text
        className="border-b border-border px-4 py-3 text-sm font-semibold text-foreground"
        style={{ fontFamily: 'PlayfairDisplay_700Bold' }}
      >
        Ingrédients
      </Text>
      <ScrollView className="flex-1 px-4 py-2" showsVerticalScrollIndicator={false}>
        {ingredients.map((ingredient) => {
          const scaledQuantity = ingredient.quantity * scale;
          const unit = getUnitAbbreviation(ingredient.unit);
          const quantityText = formatQuantity(scaledQuantity);

          return (
            <View key={ingredient.id} className="flex-row py-1.5">
              <Text className="text-sm text-muted-foreground">• </Text>
              <Text className="flex-1 text-sm text-foreground">
                {quantityText && (
                  <Text className="font-medium">
                    {quantityText}
                    {unit && ` ${unit}`}{' '}
                  </Text>
                )}
                {ingredient.name}
                {ingredient.isOptional && (
                  <Text className="text-muted-foreground"> (optionnel)</Text>
                )}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
}
