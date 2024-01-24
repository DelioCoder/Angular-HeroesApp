import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, of, tap, map, catchError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl: string = environment.baseUrl;
  private _auth: Auth | undefined

  get auth(): Auth {
    return { ...this._auth! }
  }

  constructor( private _http: HttpClient ) { }

  checkAuthentication(): Observable<boolean> {
    
    if ( !localStorage.getItem('token')) return of(false);

    return this._http.get<Auth>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap(user => this._auth = user),
        map( user => !!user ),
        catchError( err => of(false) )
      )

  }

  login(): Observable<Auth> {
  
    return this._http.get<Auth>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => {
          this._auth = user;  
        }),
        tap(user => localStorage.setItem('token', user.id.toString()))
      )

  }

  logout() {
    this._auth = undefined;
    localStorage.clear();
  }

}
