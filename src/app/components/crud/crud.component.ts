import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { CrudService } from '../../core/service/crud.service';
import {
  MatTableModule,
  MatTableDataSource,
  MatHeaderCell,
  MatHeaderCellDef,
} from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {
  DialogComponent,
  DialogConfig,
  DialogField,
} from './dialog/dialog.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-crud',
  standalone: true,
  imports: [
    MatTableModule,
    MatHeaderCell,
    MatHeaderCellDef,
    MatIcon,
    MatPaginatorModule,
    CommonModule,
  ],
  templateUrl: './crud.component.html',
  styleUrl: './crud.component.css',
})
export class CrudComponent<T extends { id: number }> implements OnInit {
  @Input() service!: CrudService<T>;
  @Input() displayedColumns!: string[];
  @Input() columnHeaders!: { [key: string]: string };
  @Input() formFields!: DialogField[];
  @Input() crudName!: string;
  @Input() dialogComponent?: any;

  //dialog: any;
  dataSource!: MatTableDataSource<T>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  allColumns: string[] = [];

  constructor(private dialog: MatDialog) {
    this.dialogComponent = this.dialogComponent || DialogComponent;
  }

  ngOnInit() {
    this.allColumns = [...this.displayedColumns, 'actions'];
    this.loadData();
  }

  loadData() {
    this.service.getAll().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteItem(item: T) {
    const dialogRef = this.dialog.open(this.dialogComponent, {
      data: {
        type: 'confirm',
        title: 'Confirmar Eliminación',
        message: '¿Estás seguro de eliminar este elemento?',
        confirmText: 'Eliminar',
      } as DialogConfig,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.service.delete(item.id).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  createItem() {
    const dialogRef = this.dialog.open(this.dialogComponent, {
      width: '1000px',
      height: '400px',
      data: {
        type: 'form',
        title: 'Crear Nuevo Elemento',
        fields: this.formFields,
      } as DialogConfig,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.service.create(result).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  editItem(item: T) {
    const dialogRef = this.dialog.open(this.dialogComponent, {
      width: '1000px',
      height: '400px',
      data: {
        type: 'form',
        title: 'Editar Elemento',
        fields: this.formFields,
        item,
      } as DialogConfig,
    });

    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        this.service.update(item.id, result).subscribe(() => {
          this.loadData();
        });
      }
    });
  }

  getHeaderName(column: string): string {
    return this.columnHeaders[column] || column;
  }
}
