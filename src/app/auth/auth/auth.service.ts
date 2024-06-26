import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';


export interface AuthResponsedata {
  idToken: string,
  email: string,
  refreshToken: string,
  expiresIn: string,
  localId: string,
  registered?: boolean
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userSubject = new BehaviorSubject<User | null>(null);
  isAnyUserLoggedIN = new BehaviorSubject<boolean>(false);
  private tokenExpirationTimer: any;
  constructor(private httpClient: HttpClient) { }

  signUp(email: string, password: string) {
    return this.httpClient.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAI3mlkBarqJI7lGQy_59_LLPqW-FeT28Y', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.email, response.localId, response.idToken, response.expiresIn);
    }));
  }


  login(email: string, password: string) {
    return this.httpClient.post<AuthResponsedata>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAI3mlkBarqJI7lGQy_59_LLPqW-FeT28Y', {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(catchError(this.handleError), tap(response => {
      this.handleAuthentication(response.email, response.localId, response.idToken, response.expiresIn);
    }));
  }

  autoLogin() {
    const userData = localStorage.getItem('userData');
    if (!userData)
      return;

    const userDataParsed: { email: string; id: string; _token: string; _tokenExpirationDate: Date; } = JSON.parse(userData ? userData : '');
    const loadedUser = new User(userDataParsed.email, userDataParsed.id, userDataParsed._token, new Date(userDataParsed._tokenExpirationDate));

    if (loadedUser.token) {
      this.userSubject.next(loadedUser);
      this.isAnyUserLoggedIN.next(true);
      const expirationDate = new Date(userDataParsed._tokenExpirationDate).getTime() - new Date().getTime();
      this.autoLogOut(expirationDate);
    }
  }

  autoLogOut(expirationDuration: number) {
    this.tokenExpirationTimer = setTimeout(() => {
      this.Logout();
    }, expirationDuration);

    //whats wrong with approach used below???? i dont see any problem.
    // if (!this.userSubject.value?.token) 
    //   this.Logout();

  }

  Logout() {
    this.userSubject.next(null);
    this.isAnyUserLoggedIN.next(false);
    localStorage.removeItem('userData');

    if (this.tokenExpirationTimer)
      clearTimeout(this.tokenExpirationTimer);

    this.tokenExpirationTimer = null;
  }

  private handleAuthentication(email: string, localId: string, idToken: string, expiresIn: string) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    this.userSubject.next(user);
    this.isAnyUserLoggedIN.next(true);
    this.autoLogOut(+expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(errorRes: HttpErrorResponse) {

    let errorMessage = 'An Unknown error Occurred!';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(() => new Error(errorMessage));
    }

    switch (errorRes.error.error.message) {

      case 'EMAIL_NOT_FOUND':
        errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
        break;

      case 'INVALID_PASSWORD':
        errorMessage = 'The password is invalid or the user does not have a password.';
        break;

      case 'USER_DISABLED':
        errorMessage = 'The user account has been disabled by an administrator.';
        break;

      case 'EMAIL_EXISTS':
        errorMessage = 'The email address is already in use by another account.';
        break;

      case 'OPERATION_NOT_ALLOWED':
        errorMessage = 'Password sign-in is disabled for this project.';
        break;

      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
        break;

      case 'INVALID_LOGIN_CREDENTIALS':
        errorMessage = 'The password or email is invalid or the user does not have a password.';
        break;
    }
    return throwError(() => new Error(errorMessage));
  }

}
