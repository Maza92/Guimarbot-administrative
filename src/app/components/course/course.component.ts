import { Component } from '@angular/core';
import { CourseService } from '../../core/service/course.service';
import { Validators } from '@angular/forms';
import { DialogField } from '../crud/dialog/dialog.component';
import { CrudComponent } from '../crud/crud.component';
import { CourseDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CrudComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  dialogComponent = CourseDialogComponent;
  constructor(public courseService: CourseService) {}
  crudName = 'Curso';
  displayedColumns = [
    'title',
    'description',
    'price',
    'teacherName',
    'durationHours',
    'totalLessons',
    'averageRating',
    'isPublished',
    'level',
  ];
  columnHeaders = {
    title: 'Titulo',
    description: 'Descripción',
    price: 'Precio',
    teacherName: 'Profesor',
    durationHours: 'Duración',
    totalLessons: 'Lecciones',
    averageRating: 'Rating',
    isPublished: 'Publicado',
    level: 'Nivel',
  };
  formFields: DialogField[] = [
    {
      name: 'title',
      label: 'Titulo',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'price',
      label: 'Precio',
      type: 'number',
      validators: [Validators.required],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'teacherName',
      label: 'Profesor',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'durationHours',
      label: 'Duración',
      type: 'number',
      validators: [Validators.required],
    },
    {
      name: 'totalLessons',
      label: 'Lecciones',
      type: 'number',
      validators: [Validators.required],
    },
    {
      name: 'averageRating',
      label: 'Rating',
      type: 'number',
      validators: [Validators.required],
    },
    {
      name: 'isPublished',
      label: 'Publicado',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'level',
      label: 'Nivel',
      type: 'text',
      validators: [Validators.required],
    },
  ];
}
