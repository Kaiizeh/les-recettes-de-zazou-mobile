import { ScrollView, Pressable } from 'react-native';
import { Badge } from '@/components/ui/badge';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { FILTER_TAGS } from '@/data/mockRecipes';
import type { FilterTag } from '@/types/recipe';
import { cn } from '@/lib/utils';
import {
  Leaf,
  Timer,
  Flame,
  Bot,
  WheatOff,
  Cake,
  UtensilsCrossed,
  Soup,
  type LucideIcon,
} from 'lucide-react-native';

const ICON_MAP: Record<string, LucideIcon> = {
  Leaf,
  Timer,
  Flame,
  Bot,
  WheatOff,
  Cake,
  UtensilsCrossed,
  Soup,
};

interface FilterTagsProps {
  activeTags: FilterTag[];
  onToggleTag: (tag: FilterTag) => void;
}

export function FilterTags({ activeTags, onToggleTag }: FilterTagsProps) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 16, gap: 8 }}
    >
      {FILTER_TAGS.map((tag) => {
        const isActive = activeTags.includes(tag.id);
        const IconComponent = ICON_MAP[tag.icon];

        return (
          <Pressable
            key={tag.id}
            onPress={() => onToggleTag(tag.id)}
            accessibilityRole="button"
            accessibilityState={{ selected: isActive }}
            accessibilityLabel={`Filtre ${tag.label}`}
          >
            <Badge
              className={cn(
                'flex-row gap-1.5 px-4 py-2',
                isActive
                  ? 'bg-primary border-primary'
                  : 'bg-card border-border'
              )}
            >
              {IconComponent && (
                <Icon
                  as={IconComponent}
                  size={16}
                  className={isActive ? 'text-primary-foreground' : 'text-muted-foreground'}
                />
              )}
              <Text
                className={cn(
                  'text-sm font-medium',
                  isActive ? 'text-primary-foreground' : 'text-foreground'
                )}
              >
                {tag.label}
              </Text>
            </Badge>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
