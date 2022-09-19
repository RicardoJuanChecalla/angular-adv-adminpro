import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoadUser } from '../interfaces/load-users.interface';
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

  get role(): 'USER_ROLE' | 'ADMIN_ROLE' {
    return this.user.role!;
  }

  get headers(){
    return{ 
      headers: { 
        'x-token': this.token 
      }
    }
  }

  saveLocalStorage(token: string, menu: any){
    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify( menu ));
  }

  createUser(formData: any){
    return this.http.post(`${base_url}/users`, formData)
      .pipe(
        tap( (resp: any) =>{
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('menu', resp.menu);
          this.saveLocalStorage(resp.token,resp.menu);
        } )
      );
  }

  updateProfile(data: { email: string, name: string, role: string }){
    data = {
      ...data,
      role: this.user.role || ''
    }
    return this.http.put(`${base_url}/users/${this.uid}`, data, this.headers);
  }

  login(formData: any){
    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap( (resp: any) =>{
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('menu', resp.menu);
          this.saveLocalStorage(resp.token, resp.menu);
        } )
      );
  }

  loginGoogle(token: string){
    return this.http.post(`${base_url}/login/google`, {token})
      .pipe(
        tap( (resp: any) =>{
          // localStorage.setItem('token', resp.token);
          // localStorage.setItem('menu', resp.menu);
          this.saveLocalStorage(resp.token,resp.menu);
        } )
      );
  }

  validateToken(): Observable<boolean> {
    return this.http.get(`${base_url}/login/renew`, this.headers)
    .pipe(
      map( (resp: any) =>{
        const { name, email, uid, image, role, google } = resp.user;
        this.user = new User(name, email, '', uid, '../../../assets/images/users/no-image.jpg', role, google);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('menu', resp.menu);
        this.saveLocalStorage(resp.token,resp.menu);
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
    localStorage.removeItem('menu');
  }

  getImageUrl(type: 'users'|'doctors'|'hospitals', image: string){
    return this.http.get(`${base_url}/upload/${type}/${image}`, this.headers);
  }

  loadUsers(from: number = 0){

    return this.http.get<LoadUser>(`${base_url}/users?from=${from}`, this.headers)
    .pipe(
      map( resp => {
        const users = resp.users.map( 
          user => new User(user.name, user.email, '', 
            user.uid, '../../../assets/images/users/no-image.jpg', user.role, user.google)  
        );
        return {
          total: resp.total,
          users
        };
      })
    )
  }

  deleteUser(uid: string){
    return this.http.delete(`${base_url}/users/${uid}`, this.headers);
  }

  updateUser(user: User){
    return this.http.put(`${base_url}/users/${user.uid}`, user, this.headers);
  }

}
