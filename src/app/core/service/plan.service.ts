import { Injectable } from '@angular/core';
import { Plan } from '../model/plan';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { API_URL_BASE } from '../model/constant';

@Injectable({
  providedIn: 'root',
})
export class PlanService extends CrudService<Plan> {
  constructor(http: HttpClient) {
    super(http, `${API_URL_BASE}/plan`);
  }
}
