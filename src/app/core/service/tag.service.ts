import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { API_URL_BASE } from '../model/constant';
import { Tag } from '../model/extras';

@Injectable({
  providedIn: 'root',
})
export class TagService extends CrudService<Tag> {
  constructor(http: HttpClient) {
    super(http, `${API_URL_BASE}/course/tags`);
  }
}
