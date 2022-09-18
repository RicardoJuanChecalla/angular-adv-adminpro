import { HttpClient } from '@angular/common/http';
import { Pipe, PipeTransform } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  constructor(private http: HttpClient){}

  get headers(){
    return{ 
      headers: { 
        'x-token': localStorage.getItem('token') || ''
      }
    }
  }

  transform(image: string, type: 'users'|'doctors'|'hospitals'): string {
    return '../../../assets/images/users/no-image.jpg';
  }

  getImageUrl(type: 'users'|'doctors'|'hospitals', image: string){
    return this.http.get(`${base_url}/upload/${type}/${image}`, this.headers).pipe(
      map( p => console.log(p) )
    );
  }

}
