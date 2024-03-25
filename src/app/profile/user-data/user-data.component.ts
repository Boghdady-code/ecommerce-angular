import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrl: './user-data.component.scss',
})
export class UserDataComponent implements OnInit, OnDestroy {
  constructor(private profileService: ProfileService) {}
  loggedUserSub: Subscription | undefined;

  userData: any = {};

  ngOnInit(): void {
    this.loggedUserSub = this.profileService
      .getLoggedInUser()
      .subscribe((res) => {
        console.log(res);

        this.userData = res.data;
      });
  }

  ngOnDestroy(): void {
    this.loggedUserSub?.unsubscribe();
  }
}
