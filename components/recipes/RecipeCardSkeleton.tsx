import { View } from 'react-native';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function RecipeCardSkeleton() {
  return (
    <Card className="overflow-hidden rounded-2xl">
      <Skeleton className="w-full" style={{ aspectRatio: 16 / 10 }} />
      <CardContent className="gap-3 p-4">
        <Skeleton className="h-6 w-3/4 rounded" />
        <View className="flex-row gap-2">
          <Skeleton className="h-5 w-16 rounded-full" />
          <Skeleton className="h-5 w-14 rounded-full" />
          <Skeleton className="h-5 w-10 rounded-full" />
        </View>
        <View className="flex-row gap-2">
          <Skeleton className="h-5 w-20 rounded-full" />
          <Skeleton className="h-5 w-16 rounded-full" />
        </View>
      </CardContent>
    </Card>
  );
}

export function RecipeListSkeleton() {
  return (
    <View className="gap-4 px-4">
      {Array.from({ length: 6 }).map((_, index) => (
        <RecipeCardSkeleton key={index} />
      ))}
    </View>
  );
}
