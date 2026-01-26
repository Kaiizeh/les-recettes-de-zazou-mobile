import { View, Pressable } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { Play, RotateCcw } from 'lucide-react-native';

interface ResumePromptProps {
  stepNumber: number;
  onResume: () => void;
  onRestart: () => void;
}

export function ResumePrompt({
  stepNumber,
  onResume,
  onRestart,
}: ResumePromptProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      className="flex-1 items-center justify-center bg-background px-6"
      style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
    >
      {/* Icon */}
      <View className="mb-6 h-16 w-16 items-center justify-center rounded-full bg-primary/10">
        <Icon as={Play} size={32} className="text-primary" />
      </View>

      {/* Title */}
      <Text
        className="mb-2 text-center text-2xl text-foreground"
        style={{ fontFamily: 'PlayfairDisplay_700Bold' }}
      >
        Reprendre la recette ?
      </Text>

      {/* Description */}
      <Text className="mb-8 text-center text-base text-muted-foreground">
        Vous étiez à l'étape {stepNumber}. Voulez-vous reprendre où vous en
        étiez ?
      </Text>

      {/* Buttons */}
      <View className="w-full max-w-xs gap-3">
        <Pressable
          onPress={onResume}
          className="flex-row items-center justify-center gap-2 rounded-xl bg-primary py-4 active:bg-primary/90"
          accessibilityRole="button"
          accessibilityLabel="Reprendre"
        >
          <Icon as={Play} size={20} className="text-white" />
          <Text className="font-medium text-white">Reprendre</Text>
        </Pressable>

        <Pressable
          onPress={onRestart}
          className="flex-row items-center justify-center gap-2 rounded-xl bg-muted py-4 active:bg-muted/80"
          accessibilityRole="button"
          accessibilityLabel="Recommencer"
        >
          <Icon as={RotateCcw} size={20} className="text-foreground" />
          <Text className="font-medium text-foreground">Recommencer</Text>
        </Pressable>
      </View>
    </View>
  );
}
