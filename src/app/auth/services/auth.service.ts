import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Auth } from '../interfaces/auth.interface';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

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

  verificarAutenticacion(): Observable<boolean> {
    if ( !localStorage.getItem('token') ) {
      return of(false);
    }

    return this._http.get<Auth>(`${ this.baseUrl }/usuarios/1`).pipe(
      //Sirve para transformar lo que se reciba del Observable y transformarlo para devolverlo.
      map( auth => {
        this._auth = auth;
        return true;
      })
    )
  }

  login() {
    return this._http.get<Auth>(`${ this.baseUrl }/usuarios/1`).pipe( tap( auth => this._auth = auth ), tap( auth => localStorage.setItem('token', auth.id) ) );
  }

  logout() {
    this._auth = undefined;
  }

}
