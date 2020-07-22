import { Chart } from 'node_modules/chart.js/dist/Chart';

export function createDoughnutChart(labels: string[], data: number[], chartId: string) {
    let ctx = document.getElementById(chartId);
    this.myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          showLine: true,
          borderColor: 'rgba(150,150,150,1)',
          backgroundColor: 'rgba(100,30,180,1)',
          data: data
        }]
      },
      options: {}
    });
}

export function createLineChart(labels: string[], data: number[], chartId: string) {
    let ctx = document.getElementById(chartId);
    this.myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [],
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
          text: 'Balance'
        }
      },
    });
}