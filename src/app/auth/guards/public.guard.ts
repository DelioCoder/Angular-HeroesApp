import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanLoad, CanActivate{
    
    constructor(
        private authService: AuthService,
        private router: Router
    ) { }
    canLoad(route: Route, segments: UrlSegment[]): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkAuthStatus();
    }
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.checkAuthStatus();
    }
    
    checkAuthStatus(): boolean | Observable<boolean>
    {
        
        return this.authService.checkAuthentication().pipe(tap( isAuthenticated => isAuthenticated && this.router.navigate(['./heroes/listado']) ));

    }

    
}