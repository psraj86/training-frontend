import { Area } from './../models/area.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
  private readonly baseUrl = environment.url + 'areas';

  constructor(private http: HttpClient) { }

  add(area: Area) {
    return this.http.post(this.baseUrl,area);
  }

  getList(): Observable<Area[]> {
    return this.http.get<Area[]>(this.baseUrl);
  }
}
