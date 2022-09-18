import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DoctorService {

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

  loadDoctors(){
    return this.http.get(`${base_url}/doctor`, this.headers)
    .pipe(
      map( ( resp: any ) => resp.doctors )
    );
  }

  getDoctorById(id: string){
    return this.http.get(`${base_url}/doctor/${id}`, this.headers)
    .pipe(
      map( ( resp: any ) => resp.doctor )
    );
  }

  createDoctor(doctor: { name: string, hospital: string }) {
    return this.http.post(`${base_url}/doctor`, doctor, this.headers);
  }

  updateDoctor(doctor: Doctor) {
    return this.http.put(`${base_url}/doctor/${doctor._id}`, doctor, this.headers);
  }

  deleteDoctor(id: string) {
    return this.http.delete(`${base_url}/doctor/${id}`, this.headers);
  }

}
