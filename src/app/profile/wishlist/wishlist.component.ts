import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { ProductsService } from '../../products/products.service';
import { AlertService } from '../../auth/alert/alert.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.scss',
})
export class WishlistComponent implements OnInit, OnDestroy {
  constructor(
    private profileService: ProfileService,
    private productService: ProductsService,
    private alert: AlertService
  ) {}

  wishlistIds: any[] = [];
  wishlistProducts: any[] = [];
  isLoading: boolean = false;
  loggedUserSub: Subscription | undefined;

  removeFromWishlist(id: string) {
    this.profileService.removeWishlistItem(id).subscribe((res) => {
      this.alert.success.next(res.message);
    });
  }

  ngOnInit(): void {
    this.loggedUserSub = this.profileService
      .getLoggedInUser()
      .subscribe((res) => {
        console.log(res);
        this.wishlistIds = res.data.wishlist;
        for (let id of this.wishlistIds) {
          this.isLoading = true;
          this.productService.getProduct(id).subscribe((res) => {
            this.isLoading = false;
            this.wishlistProducts.push(res.data);
          });
        }
      });
  }

  ngOnDestroy(): void {
    this.loggedUserSub?.unsubscribe();
  }
}
