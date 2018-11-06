import { KeyValuePair } from './../../models/vehicle.model';
import { Vehicle } from '../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';

 
@Component({
  selector: 'app-vehicle-list',
  templateUrl: 'vehicle-list.html'
})
export class VehicleListComponent implements OnInit {

  private readonly PAGE_SIZE = 5;

  queryResult: any ={};
  makes: any[];
  models: KeyValuePair[];
  query: any={
    pageSize: this.PAGE_SIZE,
  };
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
      .subscribe(result => { this.queryResult = result;        
      });
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
    this.query.page = 1;
    this.query.pageSize = this.PAGE_SIZE;    
    this.populateVehicles();
  }

  resetFilter(){
    this.query= {
      page: 1,
      pageSize: this.PAGE_SIZE
    };

    this.populateVehicles();
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

  onPageChange(page) {
    this.query.page = page; 
    this.populateVehicles();
  }
} 