export interface Restaurant {
  id: string;
  name: string;
  location: string;
  category: string;
  priceRange: string;
  isFavorite: boolean;
  lat?: number;
  lng?: number;
}

export interface FilterState {
  categories: string[];
  priceRanges: string[];
}
