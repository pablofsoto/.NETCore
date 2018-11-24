import { SaveVehicle } from 'src/app/models/vehicle.model';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators'
import { HttpClient } from '@angular/common/http';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  private readonly vehiclesEndpoint = '/api/vehicles'; 
  constructor(private http: Http, private http2: HttpClient) { }

  getMakes() {
    return this.http.get('/api/makes').pipe(map(res => res.json()));
    
  }
  getFeatures() {
    return this.http.get('/api/features').pipe(map(res => res.json()));
    
  }

  create(vehicle:SaveVehicle){
    return this.http2.post(this.vehiclesEndpoint,vehicle);//.pipe(map(res => res.json())); 
  }

  update(vehicle:SaveVehicle){
    //return this.http.put(this.vehiclesEndpoint+"/"+ vehicle.id, vehicle).pipe(map(res => res.json())); 
    return this.http2.put(this.vehiclesEndpoint+"/"+ vehicle.id, vehicle);
  }

  delete(id:number){
    return this.http2.delete(this.vehiclesEndpoint+"/"+id); //.pipe(map(res => res.json()));
  }

  getVehicle(id){
    return this.http.get(this.vehiclesEndpoint+"/"+id)
    .pipe(
      map(res => res.json())
    );
  }

  getVehicles(filter){
    return this.http.get(this.vehiclesEndpoint+'?'+this.toQueryString(filter)).pipe(
      map(x => x.json())
    );
  }

  toQueryString(obj){
    var parts =[];
    for (var property in obj){
      var value = obj[property];
      if (value != null && value != undefined)
        parts.push(encodeURIComponent(property)+'='+encodeURIComponent(value));
    }

    return parts.join('&');
  }
}
