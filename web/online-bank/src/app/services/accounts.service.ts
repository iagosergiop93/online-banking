import { Injectable } from '@angular/core';
import { tokenExists, getInfo } from '../utils/token-handler';
import { User } from '../entities/user';
import { ValidatorService } from './validator.service';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/environments/environment';
import { Account } from '../entities/account';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

	validator: ValidatorService;
	http: HttpClient;

	accounts: Subject<Account[]> = new Subject<Account[]>();

	constructor(validator: ValidatorService, http: HttpClient) {
		this.validator = validator;
		this.http = http;
	}

	getAccountsInfo() {
		try {
			// Check token and Info existence
			if(!tokenExists()) throw new Error("Unauthenticated User");
			const principal: User = getInfo();
			if(!this.validator.user(principal)) throw new Error("Invalid Credentials");

			// Make request
			const url = API_URL + "/accounts/user/" + principal.id;
			this.http.get<Account[]>(url).subscribe(
				(res) => {
					res.forEach((acc) => {
						if(!this.validator.account(acc)) throw new Error("Server Error");
					})
					this.accounts.next(res);
				}
			);

		} catch (err) {
			throw err;	
		}
	}

}
