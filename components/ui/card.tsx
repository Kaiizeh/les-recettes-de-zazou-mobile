import { cn } from '@/lib/utils';
import { View, type ViewProps } from 'react-native';

function Card({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn(
        'rounded-xl border border-border bg-card shadow-sm',
        className
      )}
      {...props}
    />
  );
}

function CardHeader({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('flex flex-col gap-1.5 p-6', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('p-6 pt-0', className)}
      {...props}
    />
  );
}

function CardFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn('flex flex-row items-center p-6 pt-0', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardContent, CardFooter };
