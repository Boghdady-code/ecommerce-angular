import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { OrdersComponent } from './orders/orders.component';
import { WishlistComponent } from './wishlist/wishlist.component';
import { HttpClientModule } from '@angular/common/http';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserDataComponent } from './user-data/user-data.component';

@NgModule({
  declarations: [OrdersComponent, WishlistComponent, UserProfileComponent, UserDataComponent],
  imports: [CommonModule, ProfileRoutingModule, HttpClientModule],
})
export class ProfileModule {}
