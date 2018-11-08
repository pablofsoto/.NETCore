import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';

const routes: Routes = [
  {path:'vehicles/new', component:VehicleFormComponent},
  {path:'vehicles/edit/:id', component:VehicleFormComponent},
  {path:'vehicles', component:VehicleListComponent},
  {path:'vehicles/:id', component:ViewVehicleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
