import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { createSimpleTransactionFormGroup, createTransferTransactionFormGroup } from '../../../utils/createFormGroups';
import { BalanceComponent } from '../balance/balance.component';
import { AccountsService } from 'src/app/services/accounts.service';
import { Account, ACCOUNT_DICT } from 'src/app/entities/account';
import { Transaction, TransactionType, TRANSACTION_DICT } from 'src/app/entities/transaction';
import { TransactionsService } from 'src/app/services/transactions.service';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-make-transaction-page',
  templateUrl: './make-transaction-page.component.html',
  styleUrls: ['./make-transaction-page.component.scss']
})
export class MakeTransactionPageComponent implements OnInit {

	@ViewChild('accounts') accountComponent: BalanceComponent;

	accountsArray: Account[] = [];
	accDict = ACCOUNT_DICT;
	transactionForm: FormGroup;
	get f() {
		return this.transactionForm.controls;
	}
	transactionType: TransactionType = TransactionType.DEPOSIT;
	transactionTypeDict = TRANSACTION_DICT;

	constructor(public router: Router, public accountsService: AccountsService,
		           public dialogService: DialogService,
		           public transactionService: TransactionsService) {}

	ngOnInit(): void {
		this.getAccounts();
		this.setTransactionType();
	}

	private getAccounts() {
		this.accountsService.getAccountsInfo().subscribe(
			(accounts: Account[]) => {
				this.accountsArray = accounts;
				this.accountComponent.accounts = accounts;
			}
		);
	}

	private setTransactionType() {
		if(this.router.url.indexOf('deposit') !== -1) {
			this.transactionType = TransactionType.DEPOSIT;
			this.transactionForm = createSimpleTransactionFormGroup();
		}
		else if(this.router.url.indexOf('withdraw') !== -1) {
			this.transactionType = TransactionType.WITHDRAW;
			this.transactionForm = createSimpleTransactionFormGroup();
		}
		else if(this.router.url.indexOf('transfer') !== -1) {
			this.transactionType = TransactionType.TRANSFER;
			this.transactionForm = createTransferTransactionFormGroup();
		}
	}

	submitForm() {
		const result = Object.assign({}, this.transactionForm.value);
		let transaction;
		if(this.transactionType === TransactionType.DEPOSIT || this.transactionType === TransactionType.WITHDRAW) {
			transaction = new Transaction(result.account, result.account, this.transactionType, result.value);
		}
		else if(this.transactionType === TransactionType.TRANSFER) {
			transaction = new Transaction(result.fromAcc, result.toAcc, this.transactionType, result.value);
		}

		this.transactionService.postTransaction(transaction).subscribe(
			(res) => {
				this.dialogService.showFeedBackDialog(res.message);
				this.router.navigate(['/dashboard']);
			},
			(err) => {
				this.dialogService.showFeedBackDialog(err.description);
			}
		);
	}

}
