import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ProfileService } from '../profile.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss',
})
export class OrdersComponent implements OnInit, OnDestroy {
  orders: any[] = [];
  isLoading: boolean = true;
  ordersSub: Subscription | undefined;
  ngOnInit(): void {
    this.ordersSub = this.profileService.getOrders().subscribe((res) => {
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
      this.orders = res.data;
    });
  }

  ngOnDestroy(): void {
    this.ordersSub?.unsubscribe();
  }

  constructor(private profileService: ProfileService) {}
}
