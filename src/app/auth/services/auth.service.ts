import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environments } from 'src/enviroments/environments';
import { IUser } from '../interfaces/user.interface';
import { Observable, tap, of, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environments.baseUrl;
  private user?: IUser;

  constructor(private httpClient: HttpClient) { }

  get currentUser(): IUser | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<IUser> {
    return this.httpClient.get<IUser>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(res => {
          this.user = res;
          localStorage.setItem('token', 'adwlkfnie.DREFtrmveropmvre.ffrieofmewFERferf');
        })
      )
  }

  checkAuthStatus(): Observable<boolean> {
    if (!localStorage.getItem('token')) return of(false);
    const token = localStorage.getItem('token');
    return this.httpClient.get<IUser>(`${this.baseUrl}/users/1`)
      .pipe(
        tap(user => this.user = user),
        map(user => !!user),
        catchError(err => of(false))
      )
  }

  logout() {
    this.user = undefined;
    localStorage.clear();
  }
}
