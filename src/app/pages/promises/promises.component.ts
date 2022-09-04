import { Component, OnInit, resolveForwardRef } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-promises',
  templateUrl: './promises.component.html',
  styles: [
  ]
})
export class PromisesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    //caso basico
    const promesa = new Promise((resolve,reject)=>{
      if(false){
        resolve('hola mundo');
      }else {
        reject('algo salio mal');
      }
    });
    promesa.then((mensaje)=>{
      console.log(mensaje);
    }).catch(error => console.log('error en mi promesa', error));
    console.log('fin del OnInit');
    //caso real
    this.getUsuario().then( usuario => {
      console.log(usuario);
    });
  }

  getUsuario(){
    return new Promise( resolve => {
      fetch('https://reqres.in/api/users?page=2')
      .then( resp => resp.json())
      .then( body => resolve(body.data));
    } );
  }

}
