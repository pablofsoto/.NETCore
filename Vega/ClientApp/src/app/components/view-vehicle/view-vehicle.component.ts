import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/vehicle.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  vehicle: any;
  vehicleId : number;

  constructor( private route: ActivatedRoute, // read route parameters
    private router: Router,        // navigate between some pages
    private vehicleService: VehicleService,
    public toastr: ToastrManager) {
      route.params.subscribe(
        p => {
           this.vehicleId = +p["id"]>0? +p["id"] :0;
           if (isNaN(this.vehicleId) || this.vehicleId <= 0){
              this.router.navigate(['/vehicles']);
           }
        });
  }

  ngOnInit() {
    this.vehicleService.getVehicle(this.vehicleId)
    .subscribe (v => this.vehicle = v
      , err => {
          if (err.status == 404){
            this.router.navigate(['/vehicles']);
          }
      });

  }

  delete(){
    if(confirm("Are you sure?")){
      this.vehicleService.delete(this.vehicle.id)
      .subscribe(x=>  this.router.navigate(['/vehicles']));
    }
  }

}
