import { Component, OnInit, ViewChild } from '@angular/core';
import { SummaryComponent } from './summary/summary.component';
import { BalanceComponent } from './balance/balance.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';
import { AccountsService } from 'src/app/services/accounts.service';
import { Account } from 'src/app/entities/account';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

	@ViewChild('summary') summary: SummaryComponent;
	@ViewChild('balances') balances: BalanceComponent;
	@ViewChild('transactions') transactions: TransactionHistoryComponent;

	accountsService: AccountsService;

	constructor(accountsService: AccountsService) {
		this.accountsService = accountsService;
	}

	ngOnInit(): void {
		this.getAccounts();
	}

	getAccounts() {
		this.accountsService.getAccountsInfo();
		this.accountsService.accounts.subscribe(
			(accounts: Account[]) => {
				this.balances.accounts = accounts;
			}
		);
	}


}
