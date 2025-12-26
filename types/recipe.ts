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

export type IngredientUnit =
  | 'g'
  | 'kg'
  | 'ml'
  | 'L'
  | 'cl'
  | 'cuillere a soupe'
  | 'cuillere a cafe'
  | 'piece'
  | 'pincee'
  | 'gousse'
  | 'tranche'
  | 'feuille';

export interface Ingredient {
  id: string;
  name: string;
  quantity: number;
  unit: IngredientUnit;
  isOptional?: boolean;
}

export interface RecipeStep {
  id: string;
  stepNumber: number;
  instruction: string;
  imageUrl?: string;
  timerMinutes?: number;
}

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
  originalPortions: number;
  ingredients: Ingredient[];
  steps: RecipeStep[];
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
