import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-incrementer',
  templateUrl: './incrementer.component.html',
  styles: [
  ]
})

export class IncrementerComponent implements OnInit {
  
  ngOnInit(){
    this.btnClass = `btn ${this.btnClass}`;
  }

  @Input('valorIngreso') progreso: number = 50; //renombrar variable a exponer
  // @Input() progreso: number = 50; //otra forma de la variable a exponer
  // @Input() btnClass: string = 'btn btn-primary'; 
  @Input() btnClass: string = 'btn-primary'; 
  @Output('valorSalida') valorActualizado: EventEmitter<number> = new EventEmitter;

  cambiarValor(valor: number){
    if(this.progreso >= 100 && valor>=0){
      this.valorActualizado.emit(100);
      return this.progreso = 100;
    }
    if(this.progreso <= 0 && valor<0){
      this.valorActualizado.emit(0);
      return this.progreso = 0;
    }
    this.progreso = this.progreso + valor;
    this.valorActualizado.emit(this.progreso);
    return this.progreso;
  }

  onChange(nuevoValor: number) {
    if(nuevoValor >=100){
      this.progreso = 100;
    }else if (nuevoValor <=0 ){
      this.progreso = 0;
    } else {
      this.progreso = nuevoValor;
    }
    this.valorActualizado.emit(this.progreso);
  }

}
