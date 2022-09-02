import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboradComponent } from './dashborad/dashborad.component';
import { ProgressComponent } from './progress/progress.component';
import { Graph1Component } from './graph1/graph1.component';

const routes: Routes = [
    { 
      path: 'dashboard', 
      component: PagesComponent,
      children: [
        { path: '', component: DashboradComponent },
        { path: 'progress', component: ProgressComponent },
        { path: 'graph1', component: Graph1Component },
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
