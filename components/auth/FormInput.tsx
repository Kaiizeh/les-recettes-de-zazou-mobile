import React from 'react';
import { View, TextInput, TextInputProps } from 'react-native';
import { Text } from '@/components/ui/text';
import { cn } from '@/lib/utils';

interface FormInputProps extends TextInputProps {
  label: string;
  error?: string;
  containerClassName?: string;
}

export function FormInput({
  label,
  error,
  containerClassName,
  className,
  ...props
}: FormInputProps) {
  return (
    <View className={cn('gap-2', containerClassName)}>
      <Text className="text-sm font-medium text-foreground">{label}</Text>
      <TextInput
        className={cn(
          'h-12 rounded-xl border border-border bg-background px-4 text-base text-foreground',
          'placeholder:text-muted-foreground',
          error && 'border-destructive',
          className
        )}
        placeholderTextColor="#9CA3AF"
        {...props}
      />
      {error && (
        <Text className="text-sm text-destructive">{error}</Text>
      )}
    </View>
  );
}
