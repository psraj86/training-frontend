import { CONTENT_TYPE } from './add-header.interceptor';
import { Company } from './../models/company.model';

import { environment } from './../../environments/environment';
import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private readonly baseUrl = environment.url + 'companies';
  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Company[]> {

    return this.http.get<Company[]>(this.baseUrl, {
      context: new HttpContext().set(CONTENT_TYPE, 'application/xml')
    }).pipe(
      map((companies) => {
        return companies.map(company => {
          let obj: Company = {
            id: company.id,
            name: company.name,
            maxUser: company.maxUser,
            isDCRProgressive: company.isDCRProgressive,
            isDivisionExist: company.isDivisionExist
          };
          return obj;
        })
      })
    )
  }

  add(company: Company): Observable<Company> {
    console.log('Calling for add company');
    return this.http.post<Company>(this.baseUrl, company);
  }

  update(company: Company): Observable<Company> {
    const url = `${this.baseUrl}/${company.id}`
    return this.http.put<Company>(url, company);
  }

  delete(id: string) {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete(url);
  }
}
