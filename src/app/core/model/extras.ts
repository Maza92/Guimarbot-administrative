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
