import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/orders`);
  }

  getLoggedInUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/users/me`);
  }

  removeWishlistItem(id: string): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/wishlist/${id}`);
  }
}
