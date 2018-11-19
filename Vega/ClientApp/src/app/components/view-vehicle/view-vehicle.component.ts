import { PhotoService } from './../../services/photo.service';
import { VehicleService } from './../../services/vehicle.service';
import { Vehicle } from './../../models/vehicle.model';
import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-view-vehicle',
  templateUrl: './view-vehicle.component.html',
  styleUrls: ['./view-vehicle.component.css']
})
export class ViewVehicleComponent implements OnInit {
  @ViewChild('fileInput') fileInput: ElementRef;
  vehicle: Vehicle = {
    id:0,
    model:{id:0, name:''},
    make:{id:0, name:''},
    isRegistered:false,
    features:[],
    contact:{
      name:"",phone:"", email:""
    },
    lastUpdated:""
  };
  photos: any[];

  constructor( private route: ActivatedRoute, // read route parameters
    private router: Router,        // navigate between some pages
    private vehicleService: VehicleService,
    private photoService : PhotoService,
    public toastr: ToastrManager) {
      route.params.subscribe(
        p => {
           this.vehicle.id = +p["id"]>0? +p["id"] :0;
           if (isNaN(this.vehicle.id) || this.vehicle.id <= 0){
              this.router.navigate(['/vehicles']);
           }
        });
  }

  ngOnInit() {
    this.photoService.getPhotos(this.vehicle.id) 
      .subscribe(photos => this.photos = photos);

    this.vehicleService.getVehicle(this.vehicle.id)
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

  uploadPhoto() {
    var nativeElement: HTMLInputElement = this.fileInput.nativeElement;

    this.photoService.upload(this.vehicle.id,nativeElement.files[0])
    .subscribe(photo => {
      console.log(photo);
      this.photos.push(photo);
      
    });
  }

}
