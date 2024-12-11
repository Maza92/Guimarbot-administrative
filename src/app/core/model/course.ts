export interface Course {
  id: number
  title: string
  description: string
  price: number
  videoPreviewUrl: string
  teacherName: string
  durationHours: number
  totalLessons: number
  averageRating: number
  isPublished: boolean
  level: string
  createdAt: string
  updatedAt: string
  tags: any[]
}
