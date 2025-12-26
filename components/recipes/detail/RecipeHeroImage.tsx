import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolation,
  SharedValue,
} from 'react-native-reanimated';

interface RecipeHeroImageProps {
  imageUrl: string;
  scrollY: SharedValue<number>;
}

export function RecipeHeroImage({ imageUrl, scrollY }: RecipeHeroImageProps) {
  const imageAnimatedStyle = useAnimatedStyle(() => {
    const translateY = interpolate(
      scrollY.value,
      [-100, 0, 200],
      [-30, 0, 40],
      Extrapolation.CLAMP
    );
    return {
      transform: [{ translateY }, { scale: 1.1 }],
    };
  });

  return (
    <View className="overflow-hidden" style={{ aspectRatio: 4 / 3 }}>
      <Animated.Image
        source={{ uri: imageUrl }}
        className="absolute inset-0 h-full w-full"
        resizeMode="cover"
        style={imageAnimatedStyle}
      />
    </View>
  );
}
