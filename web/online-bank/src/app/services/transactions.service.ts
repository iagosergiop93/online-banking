import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Transaction } from '../entities/transaction';
import { tokenExists, getInfo } from '../utils/token-handler';
import { User } from '../entities/user';
import { API_URL } from 'src/environments/environment';
import { userValidator } from '../utils/validator';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {

	http: HttpClient;

	transactions: Subject<Transaction[]> = new Subject<Transaction[]>();

	constructor(http: HttpClient) {
		this.http = http;
	}

	getTransactions(accountNumber: string): Observable<Transaction[]> {
		try {
			// Check token and Info existence
			if(!tokenExists()) throw new Error("Unauthenticated User");
			const principal: User = getInfo();
			if(!userValidator(principal)) throw new Error("Invalid Credentials");

			// Make request
			const url = API_URL + "/transactions/account/" + accountNumber;
			return this.http.get<Transaction[]>(url);

		} catch (err) {
			throw err;	
		}
	}

}
