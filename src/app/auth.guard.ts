import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import {CanActivate,ActivatedRouteSnapshot,RouterStateSnapshot} from '@angular/router';
import {MemberService} from "./service/member.service";
import {Router,ActivatedRoute} from "@angular/router";
@Injectable()
export class AuthGuard implements CanActivate{

    constructor(private authService:MemberService,private router: Router) {}
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean {

        if (this.authService.isLogged()) {

            return true;
        }

        this.router.navigate(['/']);
        return false;
    }

}
