import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject, Observable } from 'rxjs';
import { Transaction, TransactionType } from '../entities/transaction';
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
			if(!tokenExists()) throw new Error('Unauthenticated User');
			const principal: User = getInfo();
			if(!userValidator(principal)) throw new Error('Invalid Credentials');

			// Make request
			const url = API_URL + '/transactions/account/' + accountNumber;
			return this.http.get<Transaction[]>(url);

		} catch (err) {
			throw err;
		}
	}

	postTransaction(transaction: Transaction): Observable<any> {
		try {
			// Check token and Info existence
			if(!tokenExists()) throw new Error('Unauthenticated User');
			const principal: User = getInfo();
			if(!userValidator(principal)) throw new Error('Invalid Credentials');

			// Make request
			let url = API_URL + '/transactions/';
			const type = transaction.type === TransactionType.TRANSFER ? 'transfer' : 'simple';
			url += type;

			return this.http.post<any>(url, transaction);

		} catch (error) {
			throw error;
		}
	}

}
