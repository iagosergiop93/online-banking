import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { SummaryComponent } from './summary/summary.component';
import { BalanceComponent } from './balance/balance.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AccountsService } from 'src/app/services/accounts.service';
import { Account, AccountType } from 'src/app/entities/account';
import { TransactionsService } from 'src/app/services/transactions.service';
import { Transaction } from 'src/app/entities/transaction';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, AfterViewInit {

	@ViewChild('summary') summary: SummaryComponent;
	@ViewChild('balances') balances: BalanceComponent;
	@ViewChild('transactions') transactionHistory: TransactionHistoryComponent;

	accountsService: AccountsService;
	transactionsService: TransactionsService;

	constructor(accountsService: AccountsService, transactionsService: TransactionsService) {
		this.accountsService = accountsService;
		this.transactionsService = transactionsService;
	}

	ngOnInit(): void {
		
	}

	ngAfterViewInit(): void {
		this.getAccounts();
	}

	private getAccounts() {
		this.accountsService.getAccountsInfo();
		this.accountsService.accounts.subscribe(
			(accounts: Account[]) => {
				this.balances.accounts = accounts;
				accounts.forEach((acc) => {
					this.getTransactions(acc.accountNumber, acc.type);
				});
			}
		);
	}

	private getTransactions(accountNumber: string, accountType: AccountType) {
		this.transactionsService.getTransactions(accountNumber);
		this.transactionsService.transactions.subscribe(
			(transactions: Transaction[]) => {
				this.transactionHistory.AccountDictTransactionArray[accountType] = transactions;
			}
		);
	}


}
