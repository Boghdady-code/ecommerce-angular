import { ModalserviceService } from './modalservice.service';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertService } from '../alert/alert.service';

@Component({
  selector: 'app-auth-modal',
  templateUrl: './auth-modal.component.html',
  styleUrls: ['./auth-modal.component.scss'],
})
export class AuthModalComponent {
  errors: any[] = [];
  constructor(
    private ModalserviceService: ModalserviceService,
    private auth: AuthService,
    private router: Router,
    private alert: AlertService
  ) {}

  mode: string = 'login';

  onSubmit(form: NgForm) {
    if (this.mode === 'login') {
      this.auth
        .login(form.value.email, form.value.password)
        .subscribe((res) => {
          console.log(res);
          form.reset();
          this.ModalserviceService.closeModal();

          this.router.navigate(['/home']);
          this.alert.success.next('You have been successfully logged in');
        });
    } else if (this.mode === 'register') {
      this.auth
        .signUp(
          form.value.name,
          form.value.email,
          form.value.password,
          form.value.confirmPassword
        )
        .subscribe((res) => {
          console.log(res);
          form.reset();
          this.ModalserviceService.closeModal();

          this.router.navigate(['/home']);
          this.alert.success.next('Your account has been successfully created');
        });
    } else if (this.mode === 'reset') {
      console.log(form.value.email);
      this.auth.resetPassword(form.value.email).subscribe((res) => {
        console.log(res);
        this.mode = 'code';
        this.alert.success.next(res.message);
      });
    } else if (this.mode === 'code') {
      this.auth.verifyResetCode(form.value.code).subscribe((res) => {
        console.log(res);
        this.mode = 'newPassword';
        this.alert.success.next(res.message);
      });
    } else if (this.mode === 'newPassword') {
      this.auth
        .sendNewPassword(form.value.email, form.value.newPassword)
        .subscribe((res) => {
          console.log(res);
          this.mode = 'login';
          this.alert.success.next(res.message);
        });
    }
  }

  closeModal() {
    this.ModalserviceService.closeModal();
  }
}
