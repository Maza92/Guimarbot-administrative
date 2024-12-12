export interface Category {
  id: number;
  name: string;
}

export interface Tag extends Category {}

export interface Career {
  id: number;
  title: string;
  description: string;
}

export interface CategoryResponse {
  title: string;
  description: string;
  isPublic: boolean;
  level: string;
  category: { id: number } | null;
}

export interface CategoryUpdate extends CategoryResponse {
  id: number;
}
