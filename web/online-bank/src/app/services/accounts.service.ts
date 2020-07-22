import { Injectable } from '@angular/core';
import { tokenExists, getInfo } from '../utils/token-handler';
import { User } from '../entities/user';
import { userValidator, accountValidator } from '../utils/validator';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';
import { Account } from '../entities/account';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

	http: HttpClient;

	constructor(http: HttpClient) {
		this.http = http;
	}

	getAccountsInfo(): Observable<Account[]> {
		try {
			// Check token and Info existence
			if(!tokenExists()) throw new Error("Unauthenticated User");
			const principal: User = getInfo();
			if(!userValidator(principal)) throw new Error("Invalid Credentials");

			// Make request
			const url = API_URL + "/accounts/user/" + principal.id;
			return this.http.get<Account[]>(url).pipe(map(
				res => {
					res.forEach((acc) => {
						if(!accountValidator(acc)) throw new Error("Server Error");
					});
					return res;	
				})
			);
		} catch (err) {
			throw err;	
		}
	}

}
