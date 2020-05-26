import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Chart } from 'node_modules/chart.js/dist/Chart';

@Component({
  selector: 'app-simple-line-chart',
  templateUrl: './simple-line-chart.component.html',
  styleUrls: ['./simple-line-chart.component.scss']
})
export class SimpleLineChartComponent implements OnInit, AfterViewInit {
  
  myChart: Chart;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit(): void {
    let data1 = [0,1,2,3,4,5,6,7];
    this.fillChartWithData(data1, 'myChart1');
    
    let data2 = [
      {x: 0, y: 0},
      {x: 1, y: 1},
      {x: 2, y: 4},
      {x: 3, y: 9},
      {x: 4, y: 16},
      {x: 5, y: 25},
      {x: 6, y: 36},
      {x: 7, y: 49}
    ];
    this.fillChartWithData(data2, 'myChart2');
    
  }

  fillChartWithData(data, chartId) {
    let ctx = document.getElementById(chartId);
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [1,2,3,4,5,6,7],
        datasets: [{
          showLine: true,
          borderColor: 'rgba(150,150,150,1)',
          backgroundColor: 'rgba(100,30,180,1)',
          data: data
        }]
      },
      options: {
        title: {
          display: true,
          text: 'First Chart with ChartJs'
        }
      },
    });
  }

}
