import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerModelComponent } from './customer-model/customer-model.component';
import { OrgChartDiagramComponent } from './org-chart-diagram/org-chart-diagram.component';
import { TestUnitComponent } from './components/test-unit/test-unit.component';
const routes: Routes = [
  {
    path:'orgUnit',
    component:CustomerModelComponent,
  },
  {
    path:'orgChart',
    component:OrgChartDiagramComponent
  },
  {
    path:'test',
    component:TestUnitComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
