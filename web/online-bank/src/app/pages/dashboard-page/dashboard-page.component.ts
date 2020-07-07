import { Component, OnInit, ViewChild } from '@angular/core';
import { SummaryComponent } from './summary/summary.component';
import { BalanceComponent } from './balance/balance.component';
import { TransactionHistoryComponent } from './transaction-history/transaction-history.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {

	@ViewChild('summary') summary: SummaryComponent;
	@ViewChild('balances') balances: BalanceComponent;
	@ViewChild('transactions') transactions: TransactionHistoryComponent;

	constructor() { }

	ngOnInit(): void {

	}

}
