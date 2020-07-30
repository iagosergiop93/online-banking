import { Chart } from 'node_modules/chart.js/dist/Chart';

export function createDoughnutChart(labels: string[], data: number[], chartId: string) {
    const ctx = document.getElementById(chartId);
    return new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: [
            'rgba(54, 162, 235, 0.7)',
            'rgba(255, 206, 86, 0.7)',
            'rgba(75, 192, 192, 0.7)',
            'rgba(153, 102, 255, 0.7)',
            'rgba(255, 159, 64, 0.7)',
            'rgba(255, 99, 132, 0.7)',
          ]
        }]
      },
      options: {
        tooltips: {
          callbacks: {
            label: (tooltipItem, data) => {
              return data['labels'][tooltipItem['index']] + ': $' + data['datasets'][0]['data'][tooltipItem['index']];
            }
          }
        }
      }
    });
}

export function createLineChart(labels: string[], data: number[], chartId: string) {
    const ctx = document.getElementById(chartId);
    return new Chart(ctx, {
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