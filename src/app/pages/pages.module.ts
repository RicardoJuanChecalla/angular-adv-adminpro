import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';

import { DashboradComponent } from './dashborad/dashborad.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { UserComponent } from './maintenances/user/user.component';
import { DoctorComponent } from './maintenances/doctor/doctor.component';
import { HospitalComponent } from './maintenances/hospital/hospital.component';
import { PipesModule } from '../pipes/pipes.module';
import { DoctorByIdComponent } from './maintenances/doctor/doctor-by-id.component';

@NgModule({
  declarations: [
    DashboradComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent,
    AccountSettingsComponent,
    PromisesComponent,
    RxjsComponent,
    ProfileComponent,
    UserComponent,
    DoctorComponent,
    HospitalComponent,
    DoctorByIdComponent
  ],
  exports: [
    DashboradComponent,
    ProgressComponent,
    Graph1Component,
    PagesComponent,
    AccountSettingsComponent
  ],
  imports: [ CommonModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ComponentsModule,
    ReactiveFormsModule,
    PipesModule,
  ]
})
export class PagesModule { }
