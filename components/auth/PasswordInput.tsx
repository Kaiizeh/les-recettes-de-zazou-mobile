import React, { useState } from 'react';
import { View, TextInput, TextInputProps, Pressable } from 'react-native';
import { Text } from '@/components/ui/text';
import { Icon } from '@/components/ui/icon';
import { EyeIcon, EyeOffIcon } from 'lucide-react-native';
import { cn } from '@/lib/utils';

interface PasswordInputProps extends Omit<TextInputProps, 'secureTextEntry'> {
  label: string;
  error?: string;
  containerClassName?: string;
}

export function PasswordInput({
  label,
  error,
  containerClassName,
  className,
  ...props
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className={cn('gap-2', containerClassName)}>
      <Text className="text-sm font-medium text-foreground">{label}</Text>
      <View className="relative">
        <TextInput
          className={cn(
            'h-12 rounded-xl border border-border bg-background px-4 pr-12 text-base text-foreground',
            'placeholder:text-muted-foreground',
            error && 'border-destructive',
            className
          )}
          placeholderTextColor="#9CA3AF"
          secureTextEntry={!showPassword}
          autoCapitalize="none"
          autoCorrect={false}
          {...props}
        />
        <Pressable
          onPress={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-1/2 -translate-y-1/2"
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Icon
            as={showPassword ? EyeOffIcon : EyeIcon}
            className="size-5 text-muted-foreground"
          />
        </Pressable>
      </View>
      {error && (
        <Text className="text-sm text-destructive">{error}</Text>
      )}
    </View>
  );
}
