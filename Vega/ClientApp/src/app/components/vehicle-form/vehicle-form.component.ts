import * as _ from 'underscore';
import { Vehicle,SaveVehicle } from './../../models/vehicle.model';
import { VehicleService } from '../../services/vehicle.service';
import { Component, OnInit } from '@angular/core';
import { ToastrManager } from 'ng6-toastr-notifications';
import { ActivatedRoute, Router } from '@angular/router';
import { forkJoin } from 'rxjs';


@Component({
  selector: 'app-vehicle-form',
  templateUrl: './vehicle-form.component.html',
  styleUrls: ['./vehicle-form.component.css']
})
export class VehicleFormComponent implements OnInit {
  title = "New Vehicle" ;
  makes:any[];
  models:any[];
  features: any[];
  vehicle:SaveVehicle = {
    id:0,
    makeId:0,
    modelId:0,
    isRegistered:false,
    features:[],
    contact:{
      name:"",phone:"", email:""
    }
  };

  constructor(
        private route: ActivatedRoute, // read route parameters
        private router: Router,        // navigate between some pages
        private vehicleService: VehicleService,
        public toastr: ToastrManager
    ) { 
         route.params.subscribe(
           p => {
              this.vehicle.id = +p["id"] || 0;
              
           });
          
    }

  ngOnInit() {
    var sources = [
      this.vehicleService.getMakes(),
      this.vehicleService.getFeatures()
    ];

    if (this.vehicle.id)
        sources.push(  this.vehicleService.getVehicle(this.vehicle.id));

    forkJoin(sources).subscribe( data => {
        this.makes = data[0];
        this.features = data[1];
        
        if (this.vehicle.id){
          this.title = "Edit Vehicle " + this.vehicle.id;
          this.setVehicle(data[2]);
          this.populateModels();
        }
         
    }, error => {
          if (error.status == 404){
            this.router.navigate(['/home']);
          }
      }
    );
    
  }

  private setVehicle(v:Vehicle){
    this.vehicle.id = v.id | 0;
    this.vehicle.makeId = v.make.id;
    this.vehicle.modelId = v.model.id;
    this.vehicle.isRegistered = v.isRegistered,
    this.vehicle.contact = v.contact,
    this.vehicle.features = _.pluck(v.features,"id");
  }

  private populateModels(){
     var selectedMake = this.makes.find(m => m.id == this.vehicle.makeId);
     this.models = selectedMake ? selectedMake.models: []; 
  }

  onMakeChange(){
     this.populateModels();
     delete this.vehicle.modelId;
  }

  onFeatureToggle(featureId, $event){
    console.log(featureId);
    if ($event.target.checked)
      this.vehicle.features.push(featureId);
    else{
      var index = this.vehicle.features.indexOf(featureId);
      this.vehicle.features.splice(index,1);
    }

  }

  submit(){
     if(this.vehicle.id){
       
       this.vehicleService.update(this.vehicle)
       .subscribe(x=> {
        var msg = "The Vehicle "+x.id +" was successfuly updated";
        this.showSuccess(msg);
       });
     }
     else{
      
      this.vehicleService.create(this.vehicle)
      .subscribe(
        x => {
          var msg = "The Vehicle "+x.id +" was successfuly created";
          this.showSuccess(msg);         
        }       
      );
     }
     
  }

  delete(){
    if(confirm("Are you sure?")){
      this.vehicleService.delete(this.vehicle.id)
      .subscribe(x=>  this.router.navigate(['/home']));
    }
  }

  showSuccess(message) {
    this.toastr.successToastr(message, 'Success!');
  }

  showError(message) {
      this.toastr.errorToastr(message, 'Oops!');
  }

  showWarning(message) {
      this.toastr.warningToastr(message, 'Alert!');
  }

  showInfo(message) {
      this.toastr.infoToastr(message, 'Info');
  }

  showCustom(message) {
      this.toastr.customToastr(message, null, { enableHTML: true });
  }

  showToast(position: any = 'top-left',message) {
      this.toastr.infoToastr(message, 'Toast', { position: position });
  }
}
