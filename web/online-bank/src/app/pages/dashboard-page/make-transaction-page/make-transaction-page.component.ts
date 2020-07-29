import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { createSimpleTransactionFormGroup } from '../../../utils/createFormGroups';
import { BalanceComponent } from '../balance/balance.component';
import { AccountsService } from 'src/app/services/accounts.service';
import { Account, ACCOUNT_DICT } from 'src/app/entities/account';


@Component({
  selector: 'app-make-transaction-page',
  templateUrl: './make-transaction-page.component.html',
  styleUrls: ['./make-transaction-page.component.scss']
})
export class MakeTransactionPageComponent implements OnInit {

	@ViewChild('accounts') accountComponent: BalanceComponent;
	accounts: Account[] = [];
	accDict = ACCOUNT_DICT;
	transactionForm: FormGroup;
	get f() {
		return this.transactionForm.controls;
	}
	transactionType: 'Deposit' | 'Withdraw' | 'Transfer';

	router: Router;
	accountsService: AccountsService;

	constructor(router: Router, accountsService: AccountsService) {
		this.router = router;
		this.accountsService = accountsService;
	}

	ngOnInit(): void {
		this.getAccounts();
		this.setTransactionType();
	}

	private getAccounts() {
		this.accountsService.getAccountsInfo().subscribe(
			(accounts: Account[]) => {
				this.accounts = accounts;
			}
		);
	}

	private setTransactionType() {
		if(this.router.url.indexOf('deposit') !== -1) {
			this.transactionType = 'Deposit';
			this.transactionForm = createSimpleTransactionFormGroup();
		}
		else if(this.router.url.indexOf('withdraw') !== -1) {
			this.transactionType = 'Withdraw';
			this.transactionForm = createSimpleTransactionFormGroup();
		}
		else if(this.router.url.indexOf('transfer') !== -1) {
			this.transactionType = 'Transfer';
		}
	}

	submitForm() {

	}

}
