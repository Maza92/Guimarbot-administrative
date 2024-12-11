import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DialogConfig } from '../../crud/dialog/dialog.component';

@Component({
  selector: 'app-dialog',
  imports: [],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css',
})
export class CourseDialogComponent {
  form!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    private fb: FormGroup,
    @Inject(MAT_DIALOG_DATA) public dialogConfif: DialogConfig
  ) {}
}
