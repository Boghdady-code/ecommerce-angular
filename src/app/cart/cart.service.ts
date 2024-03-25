import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor(private http: HttpClient) {}

  getCartItems(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/cart`);
  }

  updateItemQuantity(id: number, quantity: number): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/cart/${id}`, {
      quantity,
    });
  }

  deleteCartItem(id: number): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/cart/${id}`);
  }

  onCouponApplied(couponCode: string): Observable<any> {
    return this.http.put(`${environment.apiUrl}/api/cart/applyCoupon`, {
      coupon: couponCode,
    });
  }

  checkoutByCash(
    cartId: number,
    address: string,
    city: string,
    phone: number,
    postalCode: number
  ): Observable<any> {
    return this.http.post(`${environment.apiUrl}/api/orders/${cartId}`, {
      shippingAddress: {
        address,
        city,
        phone,
        postalCode,
      },
    });
  }

  checkoutByCard(
    cartId: number,
    address: string,
    city: string,
    phone: number,
    postalCode: number
  ): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/api/orders/checkout-session/${cartId}`,
      {
        shippingAddress: {
          address,
          city,
          phone,
          postalCode,
        },
      }
    );
  }

  onClearCart(): Observable<any> {
    return this.http.delete(`${environment.apiUrl}/api/cart`);
  }
}
