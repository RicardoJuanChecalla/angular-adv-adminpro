import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Doctor } from '../models/doctor.model';
import { Hospital } from '../models/hospital.model';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class SearchsService {

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

  private transformUsers( results: any[] ): User[] {
    return results.map(
      user => new User(user.name, user.email, '',
        user.uid, '../../../assets/images/users/no-image.jpg', user.role, user.google)  
    );
  }

  private transformHospitals( results: any[] ): Hospital[] {
    return results.map(
      hospital => new Hospital(hospital.name,
        hospital.uid, '../../../assets/images/users/no-image.jpg')  
    );
  }

  private transformDoctors( results: any[] ): Doctor[] {
    return results.map(
      doctor => new Doctor(doctor.name,
        doctor.uid, '../../../assets/images/users/no-image.jpg')  
    );
  }

  searchByUser(term: string): Observable<User[]>{
    return this.http.get<any[]>(`${base_url}/search/collection/users/${term}`, this.headers)
    .pipe(
      map( (resp: any) => this.transformUsers( resp.results ) )
    );
  }

  searchByHospital(term: string): Observable<Hospital[]>{
    return this.http.get<any[]>(`${base_url}/search/collection/hospitals/${term}`, this.headers)
    .pipe(
      map( (resp: any) => this.transformHospitals( resp.results ) )
    );
  }

  searchByDoctor(term: string): Observable<Doctor[]>{
    return this.http.get<any[]>(`${base_url}/search/collection/doctors/${term}`, this.headers)
    .pipe(
      map( (resp: any) => this.transformDoctors( resp.results ) )
    );
  }


  // search(type: 'users'|'doctors'|'hospitals', term: string): Observable<User[] | Hospital[] | Doctor[]> {
  //   return this.http.get<any[]>(`${base_url}/search/collection/${type}/${term}`, this.headers)
  //   .pipe(
  //     map( (resp: any) => 
  //     {  switch ( type ) {
  //         case 'users':
  //           return this.transformUsers( resp.results )

  //         case 'hospitals':
  //           return this.transformHospitals( resp.results )

  //         case 'doctors':
  //            return this.transformDoctors( resp.results )
        
  //         default:
  //           return [];
  //       }}
  //     )
  //   );
  // }

}
