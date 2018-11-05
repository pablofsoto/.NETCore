import { KeyValuePair } from './../../models/vehicle.model';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

 
@Component({
  selector: 'app-vehicle-list',
  templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {

  vehicles: Vehicle[];
  makes: any[];
  models: KeyValuePair[];
  query: any={};
  columns= [
    {title: 'Id', key: 'id', isSortable:false},
    {title: 'Make', key: 'make', isSortable:true},
    {title: 'Model', key: 'model', isSortable:true},
    {title: 'Contact', key: 'contactName', isSortable:true},
    {title: 'Edition', key: 'link', isSortable:false}
    
  ];
  
  
  constructor(private vehicleService: VehicleService) {
    
   }
  
  ngOnInit() { 
    this.vehicleService.getMakes()
    .subscribe(makes => this.makes = makes);

    this.populateVehicles();
  }

  private populateVehicles(){
    this.vehicleService.getVehicles(this.query)
      .subscribe(vehicles => this.vehicles = vehicles);
  }

  private populateModels(){
    var selectedMake = this.makes.find(m => m.id == this.query.makeId);
    this.models = selectedMake ? selectedMake.models: []; 
 }

 onMakeChange(){
    this.populateModels();
    delete this.query.modelId;
 }
 onModelChange(){

 }

  onFilterChange(){
    this.populateVehicles();
  }

  resetFilter(){
    this.query={};
    this.onFilterChange();
  }

  sortBy(columnName){
     
     if (this.query.sortBy === columnName){
        
        this.query.isSortAscending = !this.query.isSortAscending;
        
     }
     else{
        this.query.sortBy = columnName;
        this.query.isSortAscending = true;
     }

     this.populateVehicles();
  }
} 