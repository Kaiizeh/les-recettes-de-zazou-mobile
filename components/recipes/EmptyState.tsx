import { View } from 'react-native';
import { Button } from '@/components/ui/button';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { SearchX } from 'lucide-react-native';

interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <View className="flex-1 items-center justify-center gap-4 p-8">
      <Icon as={SearchX} size={64} className="text-muted-foreground" />
      <Text className="text-center text-xl font-semibold text-foreground">
        Aucune recette trouvee
      </Text>
      <Text className="text-center text-muted-foreground">
        Essayez de modifier vos criteres de recherche
      </Text>
      <Button onPress={onReset} variant="outline">
        <Text>Reinitialiser les filtres</Text>
      </Button>
    </View>
  );
}
