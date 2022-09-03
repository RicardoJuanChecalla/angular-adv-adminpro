import { Component } from '@angular/core';

@Component({
  selector: 'app-graph1',
  templateUrl: './graph1.component.html',
  styles: [
  ]
})

export class Graph1Component {
  title1 = "Ventas";
  title2 = "Compras";
  title3 = "remates";
  title4 = "financiamiento";

  legend1: string[] = ['vino', 'cerveza', 'pisco'];
  legend2: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  legend3: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  legend4: string[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];

  data1: number[] = [350, 450, 100];
  data2: number[] = [350, 450, 100];
  data3: number[] = [350, 450, 100];
  data4: number[] = [350, 450, 100];
}
