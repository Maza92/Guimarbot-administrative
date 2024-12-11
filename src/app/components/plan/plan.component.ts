import { Component } from '@angular/core';
import { CrudComponent } from '../crud/crud.component';
import { Validators } from '@angular/forms';
import { PlanService } from '../../core/service/plan.service';
import { DialogField } from '../crud/dialog/dialog.component';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [CrudComponent],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.css',
})
export class PlanComponent {
  constructor(public planService: PlanService) {}
  displayedColumns = ['name', 'price', 'maxUsers', 'description'];
  columnHeaders = {
    name: 'Nombre',
    price: 'Precio',
    maxUsers: 'Capacidad',
    description: 'Descripción',
  };
  formFields: DialogField[] = [
    { name: 'name', label: 'Nombre', type: 'text', validators: [Validators.required] },
    { name: 'price', label: 'Precio', type: 'number', validators: [Validators.required] },
    {
      name: 'maxUsers',
      label: 'Capacidad Maxima',
      type: 'number',
      validators: [Validators.required],
    },
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      validators: [Validators.required],
    }
  ];
  crudName = 'Plan';
}
