import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap, catchError } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user = new BehaviorSubject<User>(null!);

  constructor(private http: HttpClient, private router: Router) {}

  autoLogin() {
    const userData = JSON.parse(localStorage.getItem('userData')!);
    if (!userData) {
      return;
    }

    const loadedUser = new User(userData.name, userData.email, userData._token);

    this.user.next(loadedUser);
  }

  signUp(
    name: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {
    const formInput = {
      name: name,
      email: email,
      password: password,
      confirmPassword: confirmPassword,
    };

    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/register`, formInput)
      .pipe(
        // catchError(this.errorHandle),
        tap((res) => {
          this.authHandle(
            res.data.user.name,
            res.data.user.email,
            res.data.token
          );
        })
      );
  }

  login(email: string, password: string) {
    const formInput = {
      email: email,
      password: password,
    };
    return this.http
      .post<any>(`${environment.apiUrl}/api/auth/login`, formInput)
      .pipe(
        // catchError(this.errorHandle),
        tap((res) =>
          this.authHandle(
            res.data.user.name,
            res.data.user.email,
            res.data.token
          )
        )
      );
  }

  private authHandle(name: string, email: string, token: string) {
    const user = new User(name, email, token);
    this.user.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  logout() {
    this.user.next(null!);
    localStorage.removeItem('userData');
    this.router.navigate(['/']);
  }

  resetPassword(email: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/api/auth/forgetPassword`,
      {
        email: email,
      }
    );
  }

  verifyResetCode(code: string) {
    return this.http.post<any>(
      `${environment.apiUrl}/api/auth/verifyResetCode`,
      {
        resetCode: code,
      }
    );
  }

  sendNewPassword(email: string, password: string) {
    return this.http.put<any>(`${environment.apiUrl}/api/auth/resetPassword`, {
      email: email,
      newPassword: password,
    });
  }
}
