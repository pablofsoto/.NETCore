import { AppErrorHandler } from './app.error-handler';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule, ErrorHandler } from '@angular/core';

import { ToastrModule } from 'ng6-toastr-notifications';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleFormComponent } from './components/vehicle-form/vehicle-form.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';
import {FormsModule } from '@angular/forms';

import { VehicleService } from './services/vehicle.service';


@NgModule({
  declarations: [
    AppComponent,
    VehicleFormComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    //{provide: ErrorHandler, useClass: AppErrorHandler},
    VehicleService    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
