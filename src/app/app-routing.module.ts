import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerModelComponent } from './customer-model/customer-model.component';
import { OrgChartDiagramComponent } from './org-chart-diagram/org-chart-diagram.component';
import { TestUnitComponent } from './components/test-unit/test-unit.component';
import { OrgPositionComponent } from './components/org-position/org-position.component';
import { TopmenuComponent } from './components/topmenu/topmenu.component';
import { UnauthorizeComponent } from './components/unauthorize/unauthorize.component';
import { TestUnitModule } from './components/test-unit/test-unit/test-unit.module';
const routes: Routes = [
  {
    path:'OrganizationUnitAndPositionChart',
    component:CustomerModelComponent,
    loadChildren:()=>import('./customer-model/customer-model/customer-model.module').then(m=>m.CustomerModelModule)
  },
  {
    path:'OrganizationUnitAndPositionChartAllMatrix',
    component:CustomerModelComponent,
    loadChildren:()=>import('./customer-model/customer-model/customer-model.module').then(m=>m.CustomerModelModule)
  },
  {
    path:'OrganizationUnitAndPositionChartMatrixOnly',
    component:CustomerModelComponent,
    loadChildren:()=>import('./customer-model/customer-model/customer-model.module').then(m=>m.CustomerModelModule)
  },
  {
    path:'PositionChart',
    component:OrgChartDiagramComponent,
    loadChildren:()=>import('./org-chart-diagram/org-chart-diagram/org-chart-diagram.module').then(m =>m.OrgChartDiagramModule)
  },
  {
    path:'PositionChartMatrixOnly',
    component:OrgChartDiagramComponent,
    loadChildren:()=>import('./org-chart-diagram/org-chart-diagram/org-chart-diagram.module').then(m =>m.OrgChartDiagramModule)
  },
  {
    path:'PositionChartAllMatrix',
    component:OrgChartDiagramComponent,
    loadChildren:()=>import('./org-chart-diagram/org-chart-diagram/org-chart-diagram.module').then(m =>m.OrgChartDiagramModule)
  },
  {
    path:'PositionChartMinimal',
    component:TestUnitComponent,
    loadChildren:()=>import('./components/test-unit/test-unit/test-unit.module').then(m => m.TestUnitModule)
  },
  {
    path:'OrganizationUnitChart',
    component:OrgPositionComponent,
    loadChildren:()=>import('./components/org-position/org-position/org-position.module').then(m => m.OrgPositionModule)
  },
  {
    path:'Unauthorize',
    component:UnauthorizeComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
