import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginForm } from '../interfaces/login-form.interface';
import { RegisterForm } from '../interfaces/register-form.interface';
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public user!: User;
  constructor(private http: HttpClient) { }

  get token(): string{
    return localStorage.getItem('token') || '';
  }

  get uid(): string{
    return this.user.uid || '';
  }

  createUser(formData: any){
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap( (resp: any) =>{
          localStorage.setItem('token', resp.token);
        } )
      );
  }

  updateProfile(data: { email: string, name: string, role: string }){
    data = {
      ...data,
      role: this.user.role || ''
    }
    return this.http.put(`${base_url}/users/${this.uid}`, data, { headers: { 'x-token': this.token }});
  }

  login(formData: any){
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp: any) =>{
          localStorage.setItem('token', resp.token);
        } )
      );
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap( (resp: any) =>{
          localStorage.setItem('token', resp.token);
        } )
      );
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, { headers: { 'x-token': this.token }})
    .pipe(
      map( (resp: any) =>{
        const { name, email, uid, image, role, google } = resp.user;
        this.user = new User(name, email, '', uid, '../../../assets/images/users/no-image.jpg', role, google);
        localStorage.setItem('token', resp.token);
        return true;
        }),
      catchError( () => of(false))
    );
      // .pipe(
      //   tap( (resp: any) =>{
      //     const { name, email, uid, image = '', role, google } = resp.user;
      //     this.user = new User(name, email, '', uid, image, role, google);
      //     localStorage.setItem('token', resp.token);
      //   } ),
      //   map( () => true ),
      //   catchError( () => of(false))
      // );
  }

  logout(){
    localStorage.removeItem('token');
  }

  getImageUrl(type: string, image: string): Observable<string>{
    const token = localStorage.getItem('token') || '';
    return this.http.get(`${base_url}/upload/${type}/${image}`, { headers: { 'x-token': token }})
      .pipe(
        tap((resp: any)=> console.log(resp))
      );
  }

}
