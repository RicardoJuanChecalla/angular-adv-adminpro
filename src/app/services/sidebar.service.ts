import { Injectable } from '@angular/core';
import { MenuInterface } from '../interfaces/menu.interface';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: MenuInterface[] = [];

  loadMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu')!) || [];
  }

  // menu: any[] = [
  //   {
  //     titulo: 'Dashborad!!',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Principal', url: '/' },
  //       { titulo: 'ProgressBar', url: 'progress' },
  //       { titulo: 'Gráfica', url: 'graph1' },
  //       { titulo: 'Promesa', url: 'promise' },
  //       { titulo: 'rxjs', url: 'rxjs' }
  //     ]
  //   },
  //   {
  //     titulo: 'Maintenance!!',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Users', url: 'users' },
  //       { titulo: 'Hospitals', url: 'hospitals' },
  //       { titulo: 'Doctors', url: 'doctors' }
  //     ]
  //   }
  // ]

  constructor() { }
}
