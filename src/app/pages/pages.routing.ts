import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthGuard } from '../guards/auth.guard';

import { PagesComponent } from './pages.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
    { 
      path: 'dashboard', 
      component: PagesComponent,
      canActivate: [ AuthGuard ],
      children: [
        { path: '', component: DashboradComponent, data:{ titulo: 'Dashborad' } },
        { path: 'progress', component: ProgressComponent, data:{ titulo: 'ProgressBar' } },
        { path: 'graph1', component: Graph1Component, data:{ titulo: 'Graph 1' } },
        { path: 'account-settings', component: AccountSettingsComponent, data:{ titulo: 'Account Settings' } },
        { path: 'promise', component: PromisesComponent, data:{ titulo: 'Promises' } },
        { path: 'rxjs', component: RxjsComponent, data:{ titulo: 'Rxjs' } },
        { path: 'profile', component: ProfileComponent, data:{ titulo: 'User profile' } },
        // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    ]
    },
    //{ path: 'path/:routeParam', component: MyComponent },
    //{ path: 'staticPath', component: ... },
    //{ path: '**', component: ... },
    //{ path: 'oldPath', redirectTo: '/staticPath' },
    //{ path: ..., component: ..., data: { message: 'Custom' }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
