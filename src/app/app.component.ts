import { AlertService } from './auth/alert/alert.service';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private auth: AuthService, private alert: AlertService) {}
  isLoading: boolean = false;

  alertMessages: string[] = [];
  successMessages: string = ' ';

  ngOnInit() {
    this.auth.autoLogin();
    setTimeout(() => {
      this.isLoading = true;
    }, 3000);

    this.alert.error.subscribe((res) => {
      this.alertMessages = res;

      setTimeout(() => {
        this.alertMessages = [];
      }, 3000);
    });

    this.alert.success.subscribe((res) => {
      this.successMessages = res;

      setTimeout(() => {
        this.successMessages = ' ';
      }, 3000);
    });
  }
}
