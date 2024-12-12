import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { HttpClient } from '@angular/common/http';
import { API_URL_BASE } from '../model/constant';
import { Roadmap } from '../model/roadmap';

@Injectable({
  providedIn: 'root',
})
export class RoadmapService extends CrudService<Roadmap> {
  constructor(http: HttpClient) {
    super(http, `${API_URL_BASE}/roadmap/default`);
  }

  updateDefaultRoadmap(roadmap: Roadmap, id: number): any {
    return this.http.put(`${API_URL_BASE}/roadmap/${id}`, roadmap);
  }
}
