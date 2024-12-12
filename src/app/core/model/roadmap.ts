import { Course } from './course';
import { Category } from './extras';

export interface Roadmap {
  id: number;
  title: string;
  description: string;
  estimatedDuration: number;
  isPublic: boolean;
  isDefault: boolean;
  level: string;
  createAt: string;
  updateAt: string;
  category: Category;
  courses: Course[];
}
