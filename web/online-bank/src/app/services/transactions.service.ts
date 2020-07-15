import { Injectable } from '@angular/core';
import { ValidatorService } from './validator.service';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Transaction } from '../entities/transaction';
import { tokenExists, getInfo } from '../utils/token-handler';
import { User } from '../entities/user';
import { API_URL } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

	validator: ValidatorService;
	http: HttpClient;

	transactions: Subject<Transaction[]> = new Subject<Transaction[]>();

	constructor(validator: ValidatorService, http: HttpClient) {
		this.validator = validator;
		this.http = http;
	}

	getTransactions(accountNumber: string) {
		try {
			// Check token and Info existence
			if(!tokenExists()) throw new Error("Unauthenticated User");
			const principal: User = getInfo();
			if(!this.validator.user(principal)) throw new Error("Invalid Credentials");

			// Make request
			const url = API_URL + "/transactions/account/" + accountNumber;
			this.http.get<Transaction[]>(url).subscribe(
				(res) => {
					this.transactions.next(res);
				}
			);

		} catch (err) {
			throw err;	
		}
	}

}
