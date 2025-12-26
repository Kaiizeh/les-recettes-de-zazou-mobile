export type Difficulty = 'Facile' | 'Moyen' | 'Difficile';

export type FilterTag =
  | 'Vegetarien'
  | 'Rapide'
  | 'Epice'
  | 'Thermomix'
  | 'Sans Gluten'
  | 'Dessert'
  | 'Plat Principal'
  | 'Entree';

export interface Recipe {
  id: string;
  name: string;
  imageUrl: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  difficulty: Difficulty;
  rating: number;
  ratingCount: number;
  isThermomixCompatible: boolean;
  isCached: boolean;
  isFavorite: boolean;
  tags: FilterTag[];
  description?: string;
}

export interface RecipeFilters {
  searchQuery: string;
  activeTags: FilterTag[];
}

export interface FilterTagInfo {
  id: FilterTag;
  label: string;
  icon: string;
}
