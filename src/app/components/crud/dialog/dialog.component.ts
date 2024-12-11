import { Component, Inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';

export interface DialogField {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'number' | 'password';
  validators?: any[];
}

export interface DialogConfig {
  type: 'form' | 'confirm';
  title?: string;
  message?: string;
  confirmText?: string;
  item?: any;
  fields?: DialogField[];
}

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class DialogComponent {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogConfig: DialogConfig
  ) {}

  ngOnInit() {
    if (this.dialogConfig.type === 'form') {
      this.initForm();
    }
  }

  private initForm() {
    const formControls: { [key: string]: [any, any[]] } = {};

    this.dialogConfig.fields?.forEach((field) => {
      formControls[field.name] = [
        this.dialogConfig.item ? this.dialogConfig.item[field.name] : '',
        field.validators || [],
      ];
    });

    this.form = this.fb.group(formControls);
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control && control.hasError('required'))
      return 'Este campo es obligatorio';
    if (control && control.hasError('email'))
      return 'Formato de email inválido';
    if (control && control.hasError('minlength'))
      return 'Longitud mínima no alcanzada';
    return 'Campo inválido';
  }

  onSubmit() {
    if (this.dialogConfig.type === 'confirm') {
      this.dialogRef.close(true);
    } else if (this.form.valid) {
      const formData = {
        ...this.dialogConfig.item,
        ...this.form.value,
      };
      this.dialogRef.close(formData);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }
}
