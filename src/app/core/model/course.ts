import { Tag } from './extras';

export interface Course {
  id: number;
  title: string;
  description: string;
  price: number;
  videoPreviewUrl: string;
  teacherName: string;
  durationHours: number;
  totalLessons: number;
  averageRating: number;
  isPublished: boolean;
  level: string;
}

export interface CourseResponse extends Course {
  tags: IdDto[];
  roadmap: IdDto;
  category: IdDto;
  career: IdDto;
  lessons: Lesson[];
}

interface IdDto {
  id: number;
}

export interface Lesson {
  title: string;
  durationMinutes: number;
  videoURL: string;
  description: string;
}
