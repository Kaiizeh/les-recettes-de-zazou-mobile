import { cn } from '@/lib/utils';
import { TextInput, type TextInputProps, Platform } from 'react-native';

type InputProps = TextInputProps & {
  className?: string;
};

function Input({ className, placeholderTextColor, ...props }: InputProps) {
  return (
    <TextInput
      className={cn(
        'h-12 w-full rounded-lg border border-input bg-background px-4 text-base text-foreground',
        'placeholder:text-muted-foreground',
        'focus:border-ring focus:ring-1 focus:ring-ring',
        'disabled:opacity-50',
        Platform.select({
          web: 'outline-none',
        }),
        className
      )}
      placeholderTextColor={placeholderTextColor ?? '#9A9A9A'}
      {...props}
    />
  );
}

export { Input };
export type { InputProps };
