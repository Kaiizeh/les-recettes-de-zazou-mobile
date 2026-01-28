import React from 'react';
import { View } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { ChefHatIcon } from 'lucide-react-native';

interface AuthLogoProps {
  subtitle?: string;
}

export function AuthLogo({ subtitle }: AuthLogoProps) {
  return (
    <View className="items-center gap-3">
      <View className="size-20 items-center justify-center rounded-full bg-forest">
        <Icon as={ChefHatIcon} className="size-10 text-white" />
      </View>
      <View className="items-center gap-1">
        <Text className="font-playfair text-3xl font-bold text-foreground">
          Les Recettes de Zazou
        </Text>
        {subtitle && (
          <Text className="text-base text-muted-foreground">{subtitle}</Text>
        )}
      </View>
    </View>
  );
}
