import { SaveVehicle } from 'src/app/models/vehicle.model';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HttpModule } from '@angular/http';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly vehiclesEndpoint = '/api/vehicles'; 
  constructor(private http: Http) { }

  getMakes() {
    return this.http.get('/api/makes').pipe(map(res => res.json()));
  }
  getFeatures() {
    return this.http.get('/api/features').pipe(map(res => res.json()));
  }

  create(vehicle:SaveVehicle){
    return this.http.post(this.vehiclesEndpoint,vehicle).pipe(map(res => res.json())); 
  }

  update(vehicle:SaveVehicle){
    return this.http.put(this.vehiclesEndpoint+"/"+ vehicle.id, vehicle).pipe(map(res => res.json())); 
  }

  delete(id:number){
    return this.http.delete(this.vehiclesEndpoint+"/"+id).pipe(map(res => res.json()));
  }

  getVehicle(id){
    return this.http.get(this.vehiclesEndpoint+"/"+id)
    .pipe(
      map(res => res.json())
    );
  }

  getVehicles(){
    return this.http.get(this.vehiclesEndpoint).pipe(
      map(x => x.json())
    );
  }
}
