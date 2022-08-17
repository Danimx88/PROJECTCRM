import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from "@auth0/angular-jwt";
import { BehaviorSubject, map, Observable, of, switchMap } from 'rxjs';
import { Usuario } from '../Usuario/interface/user.interface';

export interface LoginForm {
  usuario: string;
  contrasena: string;
};

export const JWT_NAME = 'Ny4Rl4Th0T3p';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  BASE_URL: string = 'http://localhost:3000';

  private currentUserSubject: BehaviorSubject<Usuario>;
  public currentUser: Observable<Usuario>;

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
    this.currentUserSubject = new BehaviorSubject<Usuario>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  logout() {
    localStorage.removeItem('currentUser');
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token);
  }


  login2(username: string, password: string) {
    return this.http.post<any>(`${this.BASE_URL}/login2`, { username, password }).pipe(
      map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }
        return user;
      })
    );
  }

  public get currentUserValue(): Usuario {
    return this.currentUserSubject.value;
  }

}
