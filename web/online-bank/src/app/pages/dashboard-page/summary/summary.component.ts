import { Component, OnInit } from '@angular/core';
import { Account, ACCOUNT_DICT } from 'src/app/entities/account';
import { createDoughnutChart } from 'src/app/utils/charts';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

	accounts: Account[];
	AccountDictTransactionArray: any = {};

	constructor() { }

	ngOnInit(): void {
	}

	createAccountsDoughnutChart() {
		let doughnutData = this.accounts.map(item => item.balance);
		let doughnutLabels = this.accounts.map(item => ACCOUNT_DICT[item.type]);
		createDoughnutChart(doughnutLabels, doughnutData, 'doughnutChart');
	}

	createLineChart() {

	}

}
