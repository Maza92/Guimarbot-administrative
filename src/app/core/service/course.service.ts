import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { API_URL_BASE } from '../model/constant';
import { Course } from '../model/course';

@Injectable({
  providedIn: 'root',
})
export class CourseService extends CrudService<Course> {
  constructor(http: HttpClient) {
    super(http, `${API_URL_BASE}/course`);
  }
}
