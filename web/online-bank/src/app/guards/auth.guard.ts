import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { getInfo, tokenExists } from '../utils/token-handler';

@Injectable()
export class AuthGuard implements CanActivate {

	router: Router;

	constructor(router: Router) {
		this.router = router;
	}

	canActivate(
	next: ActivatedRouteSnapshot,
	state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		if(state.url.match(/^[a-zA-Z\:\d\/]*home\/*/)) {
			if(!(tokenExists() && !!getInfo())) {
				return this.router.parseUrl('/login');
			}
		}

		return true;

	}
  
}
