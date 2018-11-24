import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAuthGuard } from './services/admin-auth-guard.service';

const routes: Routes = [
  {path:'vehicles/new', component:VehicleFormComponent},
  {path:'admin', component:AdminComponent, canActivate: [AdminAuthGuard] },
  {path:'vehicles/edit/:id', component:VehicleFormComponent},
  {path:'vehicles', component:VehicleListComponent},
  {path:'vehicles/:id', component:ViewVehicleComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
