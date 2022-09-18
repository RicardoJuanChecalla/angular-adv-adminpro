import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Hospital } from '../models/hospital.model';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return{ 
      headers: { 
        'x-token': this.token 
      }
    }
  }

  loadHospitals(): Observable<Hospital[]> {
    return this.http.get(`${base_url}/hospital`, this.headers)
    .pipe(
      map( ( resp: any ) => resp.hospitals )
    )
  }

  createHospital(name: string) {
    return this.http.post(`${base_url}/hospital`, { name }, this.headers);
  }

  updateHospital(name: string, id: string) {
    return this.http.put(`${base_url}/hospital/${id}`, { name }, this.headers);
  }

  deleteHospital(id: string) {
    return this.http.delete(`${base_url}/hospital/${id}`, this.headers);
  }

}
