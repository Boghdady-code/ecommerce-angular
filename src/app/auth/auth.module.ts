import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthModalComponent } from './auth-modal/auth-modal.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';
import { AlertComponent } from './alert/alert.component';

@NgModule({
  declarations: [AuthModalComponent, AlertComponent],
  imports: [CommonModule, FormsModule, HttpClientModule],
  exports: [AuthModalComponent, AlertComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
})
export class AuthModule {}
