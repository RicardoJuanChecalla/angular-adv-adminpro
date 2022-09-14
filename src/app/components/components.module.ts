import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { NgChartsModule } from 'ng2-charts';

import { IncrementerComponent } from './incrementer/incrementer.component';
import { DoughnutComponent } from './doughnut/doughnut.component';
import { ImageModalComponent } from './image-modal/image-modal.component';



@NgModule({
  declarations: [
    IncrementerComponent,
    DoughnutComponent,
    ImageModalComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgChartsModule
  ],
  exports: [IncrementerComponent,
    DoughnutComponent,
    ImageModalComponent
  ]
})
export class ComponentsModule { }
