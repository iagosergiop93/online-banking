import { Component, OnInit } from '@angular/core';
import { ACCOUNT_DICT, Account } from '../../../entities/account';
import { getInfo } from '../../../utils/token-handler';

@Component({
  selector: 'app-balance',
  templateUrl: './balance.component.html',
  styleUrls: ['./balance.component.scss']
})
export class BalanceComponent implements OnInit {

	accounts: Account[];

	dict = ACCOUNT_DICT;

	constructor() { }

	ngOnInit(): void {
		this.getAccounts();
	}

	getAccounts() {
		this.accounts = [
			new Account(0,"432425", 15, 1),
			new Account(0,"432425", 15, 2),
			new Account(0,"432425", 15, 3),
		]
	}

}
