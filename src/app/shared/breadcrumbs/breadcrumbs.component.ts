import { Component, OnDestroy } from '@angular/core';
import { ActivationEnd, Router } from '@angular/router';
import { filter,map, Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy {

  public titulo!: string;
  public tituloSubs$: Subscription;

  constructor( private router: Router ) { 
    this.tituloSubs$ = this.getArgumentoRuta() 
      .subscribe(data => {
        this.titulo = data['titulo'];
        document.title = `AdminPro - ${this.titulo}`;
      });
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentoRuta(){
    return this.router.events
    .pipe(
      filter((event): event is ActivationEnd => event instanceof ActivationEnd),
      filter( event => event.snapshot.firstChild === null ),
      map((value:ActivationEnd) => value.snapshot.data)
    );
  }

}
