import { Component, OnDestroy } from '@angular/core';
import { interval, Observable, retry, take, map, filter, Subscription } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() {
    this.retornaObservable().pipe(
      retry(1)
    )
    .subscribe({
      next: (valor) => console.log('Subs:', valor),
      error: (error) => console.error('Error:', error),
      complete: () => console.info('obs terminado') 
    });

    this.intervalSubs = this.retornaIntervalo()
      .subscribe( console.log);
   }

    ngOnDestroy(): void {
      this.intervalSubs.unsubscribe();
    }

    retornaIntervalo(): Observable<number> {
      return interval(500).pipe( 
      take(10),
      map( valor => { return valor + 1; }),
      filter(valor => (valor % 2 ) === 0 ),
    );
    }

    retornaObservable(): Observable<number> {
      
    return new Observable<number>( observer => {  
      let i = 0;       
      const intervalo = setInterval(() => {
        i++;
        observer.next(i);
        if(i===4){
          clearInterval(intervalo);
          observer.complete();
        }
        if(i===3){
          observer.error('i llego al valor 3');
        }
        }, 1000);
      });
   }

}
