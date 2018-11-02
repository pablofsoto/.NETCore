import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';

const routes: Routes = [
  {path:'vehicles/new', component:VehicleFormComponent},
  {path:'vehicles/:id', component:VehicleFormComponent},
  {path:'vehicles', component:VehicleListComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
