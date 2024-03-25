import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../auth/user.model';
import { AuthService } from '../auth/auth.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private auth: AuthService) {}

  getProducts(queries: any): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products`, {
      params: queries,
    });
  }

  getProduct(id: number): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/products/${id}`);
  }

  postReview(id: number, review: any, ratings: any): Observable<any> {
    console.log(id, review);
    return this.http.post(`${environment.apiUrl}/api/reviews`, {
      product: id,
      title: review['review'],
      ratings: ratings,
    });
  }

  addToCart(id: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/cart`, {
      productId: id,
    });
  }

  addToWishlist(id: number): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/wishlist`, {
      productId: id,
    });
  }
}
