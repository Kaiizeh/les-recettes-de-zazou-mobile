import { View } from 'react-native';
import { Input } from '@/components/ui/input';
import { Icon } from '@/components/ui/icon';
import { Search } from 'lucide-react-native';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
}

export function SearchBar({ value, onChangeText }: SearchBarProps) {
  return (
    <View className="relative">
      <View className="absolute left-3 top-1/2 z-10 -translate-y-1/2">
        <Icon as={Search} size={20} className="text-muted-foreground" />
      </View>
      <Input
        value={value}
        onChangeText={onChangeText}
        placeholder="Rechercher une recette..."
        className="bg-card pl-10"
        accessibilityLabel="Rechercher une recette"
      />
    </View>
  );
}
