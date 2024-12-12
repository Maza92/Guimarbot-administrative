import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Category, CategoryResponse } from '../../../core/model/extras';
import { CategoryService } from '../../../core/service/category.service';
import { DialogConfig } from '../../crud/dialog/dialog.component';

@Component({
  selector: 'app-category-dialog',
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCardModule,
    CommonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class CategoryDialogComponent {
  form!: FormGroup;
  categories: Category[] = [];

  constructor(
    public dialogRef: MatDialogRef<CategoryDialogComponent>,
    private fb: FormBuilder,
    private categoryService: CategoryService,
    @Inject(MAT_DIALOG_DATA)
    public dialogConfig: DialogConfig
  ) {}

  ngOnInit() {
    if (this.dialogConfig.type === 'form') {
      this.initForm();
      this.loadCategories();

      if (this.dialogConfig.item) {
        this.form.patchValue(this.dialogConfig.item);
      }
    } else {
      const form = document.getElementById('CategoryForm');
      if (form) {
        form.innerHTML =
          '<h2>No puedes eliminar el elemento porque contiene dependencias</h2>';
      }
    }
  }

  initForm() {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: [''],
      isPublic: [true],
      level: ['basic'],
      category: [null],
    });
  }

  loadCategories() {
    this.categoryService.getAll().subscribe((data) => (this.categories = data));
  }

  onSubmit() {
    if (this.form.valid) {
      const formData = this.form.value;

      const requestBody: CategoryResponse = {
        title: formData.title,
        description: formData.description,
        isPublic: formData.isPublic,
        level: formData.level,
        category: formData.category ? { id: formData.category } : null,
      };

      this.dialogRef.close(requestBody);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
