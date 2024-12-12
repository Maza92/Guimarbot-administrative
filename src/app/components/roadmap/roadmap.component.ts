import { Component } from '@angular/core';
import { CrudComponent } from '../crud/crud.component';
import { DialogComponent, DialogField } from '../crud/dialog/dialog.component';
import { Validators } from '@angular/forms';
import { RoadmapService } from '../../core/service/roadmap.service';
import { CategoryDialogComponent } from './dialog/dialog.component';

@Component({
  selector: 'app-roadmap',
  standalone: true,
  imports: [CrudComponent],
  templateUrl: './roadmap.component.html',
  styleUrl: './roadmap.component.css',
})
export class RoadmapComponent {
  dialogComponent = CategoryDialogComponent;
  constructor(public roadmapService: RoadmapService) {}

  displayedColumns = [
    'title',
    'description',
    'estimatedDuration',
    'level',
    'category',
  ];
  columnHeaders = {
    title: 'Título',
    description: 'Descripción',
    estimatedDuration: 'Duración Estimada',
    level: 'Nivel',
  };
  formFields: DialogField[] = [
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'description',
      label: 'Descripción',
      type: 'text',
      validators: [Validators.required],
    },
    {
      name: 'estimatedDuration',
      label: 'Duración Estimada',
      type: 'number',
      validators: [Validators.required],
    },
    {
      name: 'level',
      label: 'Nivel',
      type: 'number',
      validators: [Validators.required],
    },
    {
      name: 'category',
      label: 'Categoría',
      type: 'text',
      validators: [Validators.required],
    },
  ];
  crudName = 'Ruta de Aprendizaje';
}
