import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs';
import { environment } from 'src/environments/environment';
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

  search(type: 'users'|'doctors'|'hospitals', term: string){
    return this.http.get<any[]>(`${base_url}/search/collection/${type}/${term}`, this.headers)
    .pipe(
      map( (resp: any) => this.transformUsers( resp.results ) )
    );
  }

}
