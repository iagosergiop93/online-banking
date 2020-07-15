import { Component, OnInit } from '@angular/core';
import { Transaction, TRANSACTION_DICT } from 'src/app/entities/transaction';
import { Account, ACCOUNT_DICT } from 'src/app/entities/account';

@Component({
  selector: 'app-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

	accDict = ACCOUNT_DICT;
	trDict = TRANSACTION_DICT;

	columnsToDisplay = ['date', 'value'];

	AccountDictTransactionArray: any = {};

	constructor() { }

	ngOnInit(): void {
	}

}
