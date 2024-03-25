import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.scss',
})
export class UserProfileComponent implements OnInit {
  constructor() {}
  userData: any;

  links = [
    {
      path: 'orders',
      name: 'Orders',
    },
    {
      path: 'wishlist',
      name: 'WishList',
    },
  ];

  ngOnInit(): void {}
}
