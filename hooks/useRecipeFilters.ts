import { useMemo, useState, useCallback } from 'react';
import { useDebounce } from './useDebounce';
import { MOCK_RECIPES } from '@/data/mockRecipes';
import type { Recipe, FilterTag } from '@/types/recipe';

export function useRecipeFilters() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTags, setActiveTags] = useState<FilterTag[]>([]);
  const [favorites, setFavorites] = useState<Set<string>>(
    new Set(MOCK_RECIPES.filter((r) => r.isFavorite).map((r) => r.id))
  );

  const debouncedSearch = useDebounce(searchQuery, 300);

  const filteredRecipes = useMemo(() => {
    return MOCK_RECIPES.map((recipe) => ({
      ...recipe,
      isFavorite: favorites.has(recipe.id),
    }))
      .filter((recipe) => {
        // Search filter (case-insensitive)
        const matchesSearch = recipe.name
          .toLowerCase()
          .includes(debouncedSearch.toLowerCase());

        // Tags filter (AND logic - must have ALL selected tags)
        const matchesTags =
          activeTags.length === 0 ||
          activeTags.every((tag) => recipe.tags.includes(tag));

        return matchesSearch && matchesTags;
      })
      .sort((a, b) => b.rating - a.rating); // Sort by rating desc
  }, [debouncedSearch, activeTags, favorites]);

  const toggleTag = useCallback((tag: FilterTag) => {
    setActiveTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  }, []);

  const toggleFavorite = useCallback((id: string) => {
    setFavorites((prev) => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  }, []);

  const clearFilters = useCallback(() => {
    setSearchQuery('');
    setActiveTags([]);
  }, []);

  const hasFilters = searchQuery.length > 0 || activeTags.length > 0;

  return {
    searchQuery,
    setSearchQuery,
    activeTags,
    toggleTag,
    toggleFavorite,
    clearFilters,
    filteredRecipes,
    hasFilters,
  };
}
