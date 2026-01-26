import { View, Modal, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { AlertTriangle } from 'lucide-react-native';

interface ExitConfirmationModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export function ExitConfirmationModal({
  visible,
  onCancel,
  onConfirm,
}: ExitConfirmationModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View className="flex-1 items-center justify-center bg-black/60 px-6">
        <View className="w-full max-w-sm rounded-2xl bg-card p-6">
          {/* Icon */}
          <View className="mb-4 items-center">
            <View className="h-12 w-12 items-center justify-center rounded-full bg-amber-100">
              <Icon as={AlertTriangle} size={24} className="text-amber-600" />
            </View>
          </View>

          {/* Title */}
          <Text
            className="mb-2 text-center text-xl text-foreground"
            style={{ fontFamily: 'PlayfairDisplay_700Bold' }}
          >
            Quitter la recette ?
          </Text>

          {/* Description */}
          <Text className="mb-6 text-center text-base text-muted-foreground">
            Votre progression sera perdue.
          </Text>

          {/* Buttons */}
          <View className="flex-row gap-3">
            <Pressable
              onPress={onCancel}
              className="flex-1 items-center rounded-xl bg-muted py-3 active:bg-muted/80"
              accessibilityRole="button"
              accessibilityLabel="Annuler"
            >
              <Text className="font-medium text-foreground">Annuler</Text>
            </Pressable>

            <Pressable
              onPress={onConfirm}
              className="flex-1 items-center rounded-xl bg-destructive py-3 active:bg-destructive/90"
              accessibilityRole="button"
              accessibilityLabel="Quitter"
            >
              <Text className="font-medium text-white">Quitter</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}
