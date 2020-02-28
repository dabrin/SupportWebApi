import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'userInSession';
  userId: number;
  role: string;
  token: string;

  constructor(private http: HttpClient) {
    if (this.isUserLoggedIn()) {
      const sessionData: Session = JSON.parse(sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME));
      console.log(sessionData.IdUser);
      this.userId = sessionData.IdUser;
      this.role = sessionData.Role;
      this.token = sessionData.Token;
    }
  }

  authentication(email: string, pass: string) {
    return this.http.post<any>(`http://localhost:50044/api/Login`,
      {email, pass})
      .pipe(map((res) => {
        this.registerSuccessfulLogin(res);
        return res;
      }));
  }

  registerSuccessfulLogin(sessionData: Session) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME,
      JSON.stringify(sessionData));
    this.userId = sessionData.IdUser;
    this.token = sessionData.Token;
    this.role = sessionData.Role;
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.userId = null;
    this.token = null;
    this.role = null;
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return false; }
    return true;
  }

  getLoggedInUserName() {
    const user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    if (user === null) { return ''; }
    return user;
  }
}

interface Session {
  IdUser: number;
  Role: string;
  Token: string;
}

