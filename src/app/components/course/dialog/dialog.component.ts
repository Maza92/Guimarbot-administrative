import { Component, Inject } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogConfig } from '../../crud/dialog/dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { CategoryService } from '../../../core/service/category.service';
import { CareerService } from '../../../core/service/career.service';
import { RoadmapService } from '../../../core/service/roadmap.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { Career, Category, Tag } from '../../../core/model/extras';
import { Roadmap } from '../../../core/model/roadmap';
import { CourseResponse, Lesson } from '../../../core/model/course';
import { TagService } from '../../../core/service/tag.service';
import { MatListModule } from '@angular/material/list';
import { MatChipListbox, MatChipOption } from '@angular/material/chips';

@Component({
  selector: 'app-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    MatIcon,
    CommonModule,
    MatListModule,
    MatChipListbox,
    MatChipOption,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class CourseDialogComponent {
  form!: FormGroup;
  categories: Category[] = [];
  careers: Career[] = [];
  roadmaps: Roadmap[] = [];
  tags: Tag[] = [];
  selectedTags: Tag[] = [];

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private careerService: CareerService,
    private roadmapService: RoadmapService,
    private tagService: TagService,
    @Inject(MAT_DIALOG_DATA)
    public dialogConfig: DialogConfig
  ) {}

  ngOnInit() {
    if (this.dialogConfig.type === 'form') {
      this.initForm();
      this.loadDropdownData();

      if (this.dialogConfig.item) {
        this.form.patchValue(this.dialogConfig.item);

        if (this.dialogConfig.item.lessons) {
          this.populateLessons(this.dialogConfig.item.lessons);
        }
      }
    } else {
      const form = document.getElementById('CourseForm');
      if (form) {
        form.innerHTML =
          '<h2>No puedes eliminar el elemento por que contiene dependencias</h2>';
      }
    }
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      price: [0, [Validators.required, Validators.min(0)]],
      videoPreviewUrl: [''],
      teacherName: [''],
      durationHours: [0],
      totalLessons: [0],
      level: ['basic'],
      averageRating: [0],
      isPublished: [true],
      tags: this.fb.array([]),
      roadmap: [null],
      category: [null],
      career: [null],
      lessons: this.fb.array([]),
    });
  }

  get lessonsControls() {
    return (this.form.get('lessons') as FormArray).controls;
  }

  get tagsControls() {
    return (this.form.get('tags') as FormArray).controls;
  }

  addLesson() {
    const lessonForm = this.fb.group({
      title: [''],
      durationMinutes: [0],
      videoURL: [''],
      description: [''],
    });

    (this.form.get('lessons') as FormArray).push(lessonForm);
  }

  onTagSelect(tag: Tag) {
    if (!this.selectedTags.some((selectedTag) => selectedTag.id === tag.id)) {
      this.selectedTags.push(tag);
    }
  }

  removeLesson(index: number) {
    (this.form.get('lessons') as FormArray).removeAt(index);
  }

  removeTag(tag: Tag) {
    this.selectedTags = this.selectedTags.filter((t) => t.id !== tag.id);
  }

  populateLessons(lessons: any[]) {
    const lessonArray = this.form.get('lessons') as FormArray;
    lessons.forEach((lesson) => {
      lessonArray.push(
        this.fb.group({
          title: [lesson.title],
          durationMinutes: [lesson.durationMinutes],
          videoURL: [lesson.videoURL],
          description: [lesson.description],
        })
      );
    });
  }

  loadDropdownData() {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
    this.careerService.getAll().subscribe((data) => (this.careers = data));
    this.roadmapService.getAll().subscribe((data) => (this.roadmaps = data));
    this.tagService.getAll().subscribe((data) => (this.tags = data));
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      const requestBody: CourseResponse = {
        ...formData,
        tags: this.selectedTags.map((tag) => ({ id: tag.id })),
        roadmap: formData.roadmap ? { id: formData.roadmap } : null,
        category: formData.category ? { id: formData.category } : null,
        career: formData.career ? { id: formData.career } : null,
        lessons: formData.lessons.map((lesson: Lesson) => ({
          title: lesson.title,
          durationMinutes: lesson.durationMinutes,
          videoURL: lesson.videoURL,
          description: lesson.description,
        })),
      };
      this.dialogRef.close(requestBody);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
