import { View } from 'react-native';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Clock, Star } from 'lucide-react-native';
import type { Difficulty } from '@/types/recipe';

interface RecipeInfoSectionProps {
  totalTimeMinutes: number;
  difficulty: Difficulty;
}

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h${mins}` : `${hours}h`;
}

export function RecipeInfoSection({
  totalTimeMinutes,
  difficulty,
}: RecipeInfoSectionProps) {
  return (
    <View className="flex-row items-center gap-3 px-4 pb-2">
      {/* Time badge */}
      <View className="flex-row items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5">
        <Icon as={Clock} size={14} className="text-muted-foreground" />
        <Text className="text-sm text-foreground">
          {formatTime(totalTimeMinutes)}
        </Text>
      </View>

      {/* Difficulty badge */}
      <View className="flex-row items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5">
        <Icon as={Star} size={14} className="text-muted-foreground" />
        <Text className="text-sm text-foreground">{difficulty}</Text>
      </View>
    </View>
  );
}
