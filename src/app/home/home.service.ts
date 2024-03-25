import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getCategories(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/categories`);
  }

  getBrands(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/brands`);
  }
}
