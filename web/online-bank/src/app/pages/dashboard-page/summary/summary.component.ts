import { Component, OnInit } from '@angular/core';
import { Account, ACCOUNT_DICT } from 'src/app/entities/account';
import { createDoughnutChart, createBarChart } from 'src/app/utils/charts';
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
	barChart: Chart;

	showSummary = true;

	constructor() { }

	ngOnInit(): void {
	}

	createCharts() {
		const LabelsAndData = this.prepareChartData();
		createDoughnutChart.apply(this, [...LabelsAndData, 'doughnutChart']);
		createBarChart.apply(this, [...LabelsAndData, 'barChart']);
	}

	private prepareChartData() {
		let chartData = this.accounts.map(item => {
			if(item.balance === 0) return;
			return item.balance;
		});
		
		let chartLabels = [];
		if(chartData.length > 0 && !!chartData[0]) {
			chartLabels = this.accounts.map(item => ACCOUNT_DICT[item.type]);
		}
		else {
			this.showSummary = false;
		}

		return [chartLabels, chartData];
	}

}
