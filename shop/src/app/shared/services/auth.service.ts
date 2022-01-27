import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { consts } from '../../consts';
import { throwError, BehaviorSubject } from 'rxjs';
import { User } from 'src/app/auth/user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<User>(null);
  token: string = null;
  private tokeExiprationTimer: any;

  constructor(private http: HttpClient, private router: Router) { }

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(consts.signup_url,
       {
         email: email,
         password: password,
         returnSecureToken: true
       }).pipe(
        catchError(this.handleError), tap(resData => {
          this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        })
       );
  }

  login(email: string, password: string) {
    return this.http.post<AuthResponseData>(consts.signin_url, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError), tap(resData => {
        this.handleAuth(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
      })
     );
  }

  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokeExiprationTimer) {
      clearTimeout(this.tokeExiprationTimer);
    }
    this.tokeExiprationTimer = null;
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _token_expiration_date: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if(!userData) {
      return;
    }

    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._token_expiration_date));

    if(loadedUser.token) {
      this.user.next(loadedUser);
      const expirationDuration = new Date(userData._token_expiration_date).getTime() - new Date().getTime();
      this.autoLogout(expirationDuration);
    }
    return userData
  }

  autoLogout(expirationDuration: number) {
    this.tokeExiprationTimer = setTimeout(() => {
      this.logout();
    }, expirationDuration)
  }

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime()+ expiresIn*1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(error: HttpErrorResponse) {
    let errorMsg = "An unknown error occured";
    if(!error.error || !error.error.error) {
      return throwError(errorMsg);
    }
    switch(error.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMsg = 'Email exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMsg = "Email not found";
        break;
      case 'INVALID_PASSWORD':
        errorMsg = "Invalid password";
        break;
    }
    return throwError(errorMsg);
  }
}
