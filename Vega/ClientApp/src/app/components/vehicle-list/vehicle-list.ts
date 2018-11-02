import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

 
@Component({
  selector: 'app-vehicle-list',
  templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  
  
  constructor(private vehicleService: VehicleService) {
    
   }
  
  ngOnInit() { 
    this.vehicleService.getVehicles()
      .subscribe(vehicles => this.vehicles = vehicles);
  }
} 