import { Injectable } from '@angular/core';
import { TOKEN } from '../../environments/environment';
import { User } from '../entities/user';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

	constructor() { }

	tokenExists(): boolean {
		let tk = localStorage.getItem(TOKEN.name);
		return !!tk && tk.indexOf(TOKEN.scheme) != -1;
	}

	saveToken(token: string): void {
		localStorage.setItem(TOKEN.name, token);
	}

	getToken(): string {
		return localStorage.getItem(TOKEN.name);
	} 

	saveInfo(userInfo: User) {
		sessionStorage.setItem(TOKEN.userInfo, JSON.stringify(userInfo));
	}

	getInfo(): User {
		return JSON.parse(sessionStorage.getItem(TOKEN.userInfo));
	}

}
