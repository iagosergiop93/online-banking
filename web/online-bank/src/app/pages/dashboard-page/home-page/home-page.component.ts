import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { SummaryComponent } from '../summary/summary.component';
import { BalanceComponent } from '../balance/balance.component';
import { TransactionHistoryComponent } from '../transaction-history/transaction-history.component';
import { AccountsService } from 'src/app/services/accounts.service';
import { TransactionsService } from 'src/app/services/transactions.service';
import { AccountType, Account } from 'src/app/entities/account';
import { Transaction } from 'src/app/entities/transaction';
import { DialogService } from 'src/app/services/dialog.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, AfterViewInit, OnDestroy {

	@ViewChild('summary') summary: SummaryComponent;
	@ViewChild('balances') balances: BalanceComponent;
	@ViewChild('transactions') transactionHistory: TransactionHistoryComponent;

	constructor(public accountsService: AccountsService,
		           public dialogService: DialogService,
		           public transactionsService: TransactionsService) {}

	ngOnInit(): void {}

	ngAfterViewInit(): void {
		this.getAccounts();
	}

	ngOnDestroy(): void {}

	private getAccounts() {
		this.accountsService.getAccountsInfo().subscribe(
			(accounts: Account[]) => {
				this.balances.accounts = accounts;
				this.summary.accounts = accounts;

				accounts.forEach((acc) => {
					this.getTransactions(acc.accountNumber, acc.type);
				});

				this.summary.createAccountsDoughnutChart();
			},
			(err) => {
				this.dialogService.showFeedBackDialog(err.description);
			}
		);
	}

	private getTransactions(accountNumber: string, accountType: AccountType) {
		this.transactionsService.getTransactions(accountNumber).subscribe(
			(transactions: Transaction[]) => {
				this.transactionHistory.AccountDictTransactionArray[accountType] = transactions;
				this.summary.AccountDictTransactionArray[accountType] = transactions;
			},
			(err) => {
				this.dialogService.showFeedBackDialog(err.description);
			}
		)
	}

}
