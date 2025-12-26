import { View, Pressable } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Minus, Plus, Users } from 'lucide-react-native';
import { cn } from '@/lib/utils';

interface PortionsSelectorProps {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}

export function PortionsSelector({
  value,
  onChange,
  min = 1,
  max = 12,
}: PortionsSelectorProps) {
  const canDecrease = value > min;
  const canIncrease = value < max;

  const handleDecrease = () => {
    if (canDecrease) {
      onChange(value - 1);
    }
  };

  const handleIncrease = () => {
    if (canIncrease) {
      onChange(value + 1);
    }
  };

  return (
    <View className="mx-4 flex-row items-center justify-between rounded-xl bg-secondary/50 p-3">
      <View className="flex-row items-center gap-2">
        <Icon as={Users} size={20} className="text-primary" />
        <Text className="text-base font-medium text-foreground">Portions</Text>
      </View>

      <View className="flex-row items-center gap-3">
        {/* Decrease button */}
        <Pressable
          onPress={handleDecrease}
          disabled={!canDecrease}
          className={cn(
            'h-9 w-9 items-center justify-center rounded-full',
            canDecrease
              ? 'bg-primary active:bg-primary/80'
              : 'bg-muted opacity-50'
          )}
          accessibilityRole="button"
          accessibilityLabel="Diminuer les portions"
        >
          <Icon
            as={Minus}
            size={18}
            className={canDecrease ? 'text-white' : 'text-muted-foreground'}
          />
        </Pressable>

        {/* Value */}
        <Text className="w-8 text-center text-lg font-bold text-foreground">
          {value}
        </Text>

        {/* Increase button */}
        <Pressable
          onPress={handleIncrease}
          disabled={!canIncrease}
          className={cn(
            'h-9 w-9 items-center justify-center rounded-full',
            canIncrease
              ? 'bg-primary active:bg-primary/80'
              : 'bg-muted opacity-50'
          )}
          accessibilityRole="button"
          accessibilityLabel="Augmenter les portions"
        >
          <Icon
            as={Plus}
            size={18}
            className={canIncrease ? 'text-white' : 'text-muted-foreground'}
          />
        </Pressable>
      </View>
    </View>
  );
}
