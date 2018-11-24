import { AuthInterceptor } from './services/auth.interceptor.service';
import { AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuard } from './services/auth-guard.service';
import { AdminComponent } from './admin/admin.component';
import { PhotoService } from './services/photo.service';
import { AppErrorHandler } from './app.error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler, Component } from '@angular/core';

import { ToastrModule } from 'ng6-toastr-notifications';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { VehicleListComponent } from './components/vehicle-list/vehicle-list';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'; 
import { HttpModule, BrowserXhr } from '@angular/http';
import {FormsModule } from '@angular/forms';

import { VehicleService } from './services/vehicle.service';
import { PaginationComponent } from './components/shared/pagination/pagination.component';
import { ViewVehicleComponent } from './components/view-vehicle/view-vehicle.component';
import { BrowserXhrWithProgress, ProgressService } from './services/progress.service';
import { AuthService } from './services/auth.service';
import { ChartsModule } from 'ng2-charts/ng2-charts';




@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    NavBarComponent,
    VehicleListComponent,
    PaginationComponent,
    ViewVehicleComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    NgbModule,
    ChartsModule
  ],
  providers: [
    //{provide: ErrorHandler, useClass: AppErrorHandler},    
    AuthService,
    AuthGuard,
    AdminAuthGuard,
    VehicleService,
    PhotoService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }        
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
