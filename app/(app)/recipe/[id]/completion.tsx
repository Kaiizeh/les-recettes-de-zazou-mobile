import { View, TextInput, Pressable, KeyboardAvoidingView, Platform } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text } from '@/components/ui/text';
import { StarRating } from '@/components/cooking/StarRating';
import { MOCK_RECIPES } from '@/data/mockRecipes';
import { usePortraitOrientation } from '@/hooks/useScreenOrientation';
import { cookingStorage } from '@/lib/storage';

export default function CompletionScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const recipe = MOCK_RECIPES.find((r) => r.id === id);

  // Force portrait orientation
  usePortraitOrientation();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSkip = () => {
    router.replace(`/recipe/${id}`);
  };

  const handleSubmit = async () => {
    if (rating === 0) {
      handleSkip();
      return;
    }

    setIsSubmitting(true);

    try {
      await cookingStorage.saveRating({
        recipeId: id!,
        score: rating,
        comment: comment.trim() || undefined,
        createdAt: new Date().toISOString(),
      });
    } catch (error) {
      console.warn('Could not save rating:', error);
    }

    router.replace(`/recipe/${id}`);
  };

  if (!recipe) {
    return (
      <View className="flex-1 items-center justify-center bg-background">
        <Stack.Screen options={{ headerShown: false }} />
        <Text className="text-lg text-muted-foreground">Recette introuvable</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-background"
    >
      <Stack.Screen options={{ headerShown: false }} />

      <View
        className="flex-1 items-center justify-center px-6"
        style={{ paddingTop: insets.top, paddingBottom: insets.bottom }}
      >
        {/* Celebration emoji */}
        <Text className="mb-6 text-6xl">🎉</Text>

        {/* Title */}
        <Text
          className="mb-2 text-center text-2xl text-foreground"
          style={{ fontFamily: 'PlayfairDisplay_700Bold' }}
        >
          Recette terminee !
        </Text>

        {/* Subtitle */}
        <Text className="mb-8 text-center text-base text-muted-foreground">
          Qu'avez-vous pense de cette recette ?
        </Text>

        {/* Star rating */}
        <View className="mb-8">
          <StarRating value={rating} onChange={setRating} size={40} />
        </View>

        {/* Comment input */}
        <View className="mb-8 w-full">
          <TextInput
            value={comment}
            onChangeText={setComment}
            placeholder="Laissez un commentaire... (optionnel)"
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            className="w-full rounded-xl border border-border bg-card px-4 py-3 text-base text-foreground"
            style={{ minHeight: 100, textAlignVertical: 'top' }}
          />
        </View>

        {/* Buttons */}
        <View className="w-full flex-row gap-3">
          <Pressable
            onPress={handleSkip}
            disabled={isSubmitting}
            className="flex-1 items-center rounded-xl bg-muted py-4 active:bg-muted/80"
            accessibilityRole="button"
            accessibilityLabel="Passer"
          >
            <Text className="font-medium text-foreground">Passer</Text>
          </Pressable>

          <Pressable
            onPress={handleSubmit}
            disabled={isSubmitting}
            className="flex-1 items-center rounded-xl bg-primary py-4 active:bg-primary/90"
            accessibilityRole="button"
            accessibilityLabel="Envoyer mon avis"
          >
            <Text className="font-medium text-white">
              {isSubmitting ? 'Envoi...' : 'Envoyer mon avis'}
            </Text>
          </Pressable>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}
