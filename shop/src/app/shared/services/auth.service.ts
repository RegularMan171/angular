import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, tap } from 'rxjs/operators';
import { consts } from '../../consts';
import { Subject, throwError } from 'rxjs';
import { User } from 'src/app/auth/user.model';

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

  user = new Subject<User>();

  constructor(private http: HttpClient) { }

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

  private handleAuth(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime()+ expiresIn*1000);
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
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
