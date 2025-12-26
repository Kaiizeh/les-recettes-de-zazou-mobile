import { View } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { Clock, Star, Bot, ChefHat } from 'lucide-react-native';
import type { Difficulty } from '@/types/recipe';
import { cn } from '@/lib/utils';

interface RecipeInfoSectionProps {
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  rating: number;
  ratingCount: number;
  difficulty: Difficulty;
  isThermomixCompatible: boolean;
}

const DIFFICULTY_STYLES = {
  Facile: { badge: 'bg-primary/10', text: 'text-primary' },
  Moyen: {
    badge: 'bg-orange-100 dark:bg-orange-900/30',
    text: 'text-orange-600 dark:text-orange-400',
  },
  Difficile: {
    badge: 'bg-red-100 dark:bg-red-900/30',
    text: 'text-red-600 dark:text-red-400',
  },
};

function formatTime(minutes: number): string {
  if (minutes < 60) return `${minutes} min`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h${mins}` : `${hours}h`;
}

export function RecipeInfoSection({
  prepTimeMinutes,
  cookTimeMinutes,
  rating,
  ratingCount,
  difficulty,
  isThermomixCompatible,
}: RecipeInfoSectionProps) {
  const difficultyStyle = DIFFICULTY_STYLES[difficulty];
  const totalTime = prepTimeMinutes + cookTimeMinutes;

  return (
    <View className="gap-3 px-4 py-4">
      {/* Times row */}
      <View className="flex-row flex-wrap gap-3">
        {/* Prep time */}
        <Badge variant="secondary" className="flex-row gap-1.5">
          <Icon as={ChefHat} size={14} className="text-muted-foreground" />
          <Text className="text-xs text-muted-foreground">
            Prep: {formatTime(prepTimeMinutes)}
          </Text>
        </Badge>

        {/* Cook time */}
        {cookTimeMinutes > 0 && (
          <Badge variant="secondary" className="flex-row gap-1.5">
            <Icon as={Clock} size={14} className="text-muted-foreground" />
            <Text className="text-xs text-muted-foreground">
              Cuisson: {formatTime(cookTimeMinutes)}
            </Text>
          </Badge>
        )}

        {/* Total time */}
        <Badge variant="secondary" className="flex-row gap-1.5">
          <Icon as={Clock} size={14} className="text-primary" />
          <Text className="text-xs font-medium text-primary">
            Total: {formatTime(totalTime)}
          </Text>
        </Badge>
      </View>

      {/* Second row */}
      <View className="flex-row flex-wrap items-center gap-3">
        {/* Difficulty */}
        <Badge className={cn('flex-row', difficultyStyle.badge)}>
          <Text className={cn('text-xs font-medium', difficultyStyle.text)}>
            {difficulty}
          </Text>
        </Badge>

        {/* Rating */}
        <View className="flex-row items-center gap-1">
          <Icon as={Star} size={16} className="text-amber-500" fill="#f59e0b" />
          <Text className="text-sm font-medium text-foreground">
            {rating.toFixed(1)}
          </Text>
          <Text className="text-xs text-muted-foreground">({ratingCount})</Text>
        </View>

        {/* Thermomix */}
        {isThermomixCompatible && (
          <Badge variant="outline" className="flex-row gap-1">
            <Icon as={Bot} size={14} className="text-primary" />
            <Text className="text-xs text-muted-foreground">Thermomix</Text>
          </Badge>
        )}
      </View>
    </View>
  );
}
