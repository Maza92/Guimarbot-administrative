import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { API_URL_BASE } from '../model/constant';
import { Course } from '../model/course';
import { Category } from '../model/extras';

@Injectable({
  providedIn: 'root',
})
export class CategoryService extends CrudService<Category> {
  constructor(http: HttpClient) {
    super(http, `${API_URL_BASE}/course/categories`);
  }
}
