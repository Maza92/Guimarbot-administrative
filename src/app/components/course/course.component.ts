import { Component } from '@angular/core';
import { CrudComponent } from '../crud/crud.component';
import { PlanService } from '../../core/service/plan.service';
import { DialogField } from '../crud/dialog/dialog.component';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CrudComponent],
  templateUrl: './course.component.html',
  styleUrl: './course.component.css',
})
export class CourseComponent {
  constructor(public planService: PlanService) {}

  cursoFormFields: DialogField[] = [
    {
      name: 'nombre',
      label: 'Nombre del Curso',
      validators: [Validators.required, Validators.minLength(3)],
    },
  ];
}
