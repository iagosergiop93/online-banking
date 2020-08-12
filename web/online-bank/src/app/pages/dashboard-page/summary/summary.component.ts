import { Component, OnInit } from '@angular/core';
import { Account, ACCOUNT_DICT } from 'src/app/entities/account';
import { createDoughnutChart } from 'src/app/utils/charts';
import { Chart } from 'node_modules/chart.js/dist/Chart';

@Component({
  selector: 'app-summary',
  templateUrl: './summary.component.html',
  styleUrls: ['./summary.component.scss']
})
export class SummaryComponent implements OnInit {

	accounts: Account[];
	AccountDictTransactionArray: any = {};

	doughnutChart: Chart;
	lineChart: Chart;

	showSummary = true;

	constructor() { }

	ngOnInit(): void {
	}

	createAccountsDoughnutChart() {
		let doughnutData = this.accounts.map(item => {
			if(item.balance === 0) return;
			return item.balance;
		});
		if(doughnutData.length > 0 && !!doughnutData[0]) {
			let doughnutLabels = this.accounts.map(item => ACCOUNT_DICT[item.type]);
			this.doughnutChart = createDoughnutChart(doughnutLabels, doughnutData, 'doughnutChart');
		}
		else {
			this.showSummary = false;
		}
	}

	createLineChart() {

	}

}
