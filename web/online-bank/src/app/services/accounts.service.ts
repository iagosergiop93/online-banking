import { Injectable } from '@angular/core';
import { tokenExists, getInfo } from '../utils/token-handler';
import { User } from '../entities/user';
import { userValidator, accountValidator } from '../utils/validator';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';
import { Account, AccountType } from '../entities/account';
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

	createAccount(type: AccountType): Observable<Account> {
		try {
			// Check token and Info existence
			if(!tokenExists()) throw new Error('Unauthenticated User');
			const principal: User = getInfo();
			if(!userValidator(principal)) throw new Error('Invalid Credentials');

			// Make request
			const url = API_URL + '/accounts/type/' + type + '/user/' + principal.id;
			return this.http.post<Account>(url, {});

		} catch (error) {
			throw error;
		}
	}

	getAccountsInfo(): Observable<Account[]> {
		try {
			// Check token and Info existence
			if(!tokenExists()) throw new Error('Unauthenticated User');
			const principal: User = getInfo();
			if(!userValidator(principal)) throw new Error('Invalid Credentials');

			// Check cache
			const accounts = this.getAccountsFromCache();
			if(!!accounts) {
				return new Observable(subscriber => {
					subscriber.next(accounts);
				});
			}

			// Make request
			const url = API_URL + '/accounts/user/' + principal.id;
			return this.http.get<Account[]>(url).pipe(map(
				res => {
					res.forEach((acc) => {
						if(!accountValidator(acc)) throw new Error('Server Error');
					});
					return res;
				})
			);
		} catch (err) {
			throw err;
		}
	}

	cacheAccounts(accounts) {
		localStorage.setItem('accounts', JSON.stringify(accounts));
		setTimeout(this.cleanAccoutsCache, 120000);
	}

	cleanAccoutsCache() {
		localStorage.removeItem('accounts');
	}

	getAccountsFromCache(): Account[] {
		if(!localStorage.getItem('accounts')) return;
		return JSON.parse(localStorage.getItem('accounts')) as Account[];
	}

}
