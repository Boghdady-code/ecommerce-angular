import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { ProductsService } from '../../products/products.service';
import { Subject } from 'rxjs';
import { NgForm } from '@angular/forms';
import { AlertService } from '../../auth/alert/alert.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  constructor(
    private cartService: CartService,
    private productsService: ProductsService,
    private alert: AlertService
  ) {}

  cartItems = new Subject<any[]>();
  cardId: number | undefined;
  cartItemsValues: any[] = [];
  cartTotal = new Subject<number>();
  couponCode: string = '';
  totalPrice: number = 0;
  priceInDiscount: number = 0;
  handler: any;
  priceAfterDiscount = new Subject<number>();

  onSubmit(f: NgForm, ...values: any) {
    console.log(values);
    console.log(f.value);
    if (f.value.payment === 'cash') {
      this.cartService
        .checkoutByCash(
          this.cardId!,
          f.value.address,
          f.value.city,
          f.value.phone,
          f.value.postalCode
        )
        .subscribe((res) => {
          console.log(res);
        });
    } else {
      this.cartService
        .checkoutByCard(
          this.cardId!,
          f.value.address,
          f.value.city,
          f.value.phone,
          f.value.postalCode
        )
        .subscribe((res) => {
          console.log(res.data);

          const responseURL = res.data.session.url;
          console.log(responseURL);
          window.open(responseURL, '_blank');
        });
    }
  }

  updateQuantity(id: number, quantity: number) {
    this.cartService.updateItemQuantity(id, quantity).subscribe((res) => {
      console.log(res);
      this.cartTotal.next(res.data.totalPrice);
    });
  }

  clearCart() {
    this.cartService.onClearCart().subscribe((res) => {
      console.log(res);
      this.cartItems.next([]);
      this.alert.success.next(res.message);
    });
  }

  deleteCartItem(id: number) {
    this.cartService.deleteCartItem(id).subscribe((res) => {
      if (res.data.cartItems.length === 0) {
        this.cartItems.next([]);
      } else {
        this.cartItems.next(res.data.cartItems);
      }
      this.cartTotal.next(res.data.totalPrice);
      this.alert.success.next(res.message);
    });
  }

  applyCoupon() {
    this.cartService.onCouponApplied(this.couponCode).subscribe((res) => {
      this.priceAfterDiscount.next(res.data.cart.priceAfterDiscount);

      this.couponCode = '';
      this.alert.success.next(res.message);
      console.log(res);
    });
  }

  ngOnInit(): void {
    this.cartService.getCartItems().subscribe((res) => {
      this.cardId = res.data._id;
      console.log(this.cardId);
      this.cartItems.next(res.data.cartItems);

      this.cartTotal.next(res.data.totalPrice);
    });

    this.cartTotal.subscribe((total) => {
      this.totalPrice = total;
    });

    this.cartItems.subscribe((items) => {
      this.cartItemsValues = items;
    });

    this.priceAfterDiscount.subscribe((price) => {
      this.priceInDiscount = price;
    });
  }
}
