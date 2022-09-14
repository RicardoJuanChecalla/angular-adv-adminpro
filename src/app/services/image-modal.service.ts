import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;
@Injectable({
  providedIn: 'root'
})
export class ImageModalService {

  private _hideModal: boolean = true;
  public type!: 'users' | 'doctors' | 'hospitals';
  public uid: string = '';
  public image: string = 'no-image';
  public newImage: EventEmitter<string> = new EventEmitter();

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

  get hideModal(){
    return this._hideModal;
  }

  openModal(type: 'users'|'doctors'|'hospitals', uid: string, image?: string){
    this._hideModal = false;
    this.type = type;
    this.uid = uid;
    
    if(image?.includes('https')){
      this.image = image??'';
    }else{
      this.image = '../../../assets/images/users/no-image.jpg'
    }
    console.log(this.image)
  }

  closeModal(){
    this._hideModal = true;
  }
  
  constructor(private http: HttpClient) { }

  getImageUrl(type: 'users'|'doctors'|'hospitals', image: string){
    return this.http.get(`${base_url}/upload/${type}/${image}`, this.headers);
  }

}
