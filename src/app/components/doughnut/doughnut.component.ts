import { Component,Input } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';

@Component({
  selector: 'app-doughnut',
  templateUrl: './doughnut.component.html',
  styles: [
  ]
})
export class DoughnutComponent {
  @Input() title: string = "";
  @Input() legend: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input() data: number[] = [350, 450, 100];
  // Doughnut
  // public doughnutChartLabels: string[] = [ 'Download Sales', 'In-Store Sales', 'Mail-Order Sales' ];
  public doughnutChartData: ChartData<'doughnut'> = {
    labels: this.legend,
    datasets: [
      { data: this.data,
        backgroundColor: ['#9E120E','#FF5800','#FFB414'] 
      }
    ]
  };
  public doughnutChartType: ChartType = 'doughnut';
}
