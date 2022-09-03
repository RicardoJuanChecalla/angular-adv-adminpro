import { Component, OnInit } from '@angular/core';
import { SettingsService } from 'src/app/services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  // public linkTheme = document.querySelector('#theme'); // obtiene el id=theme desde el index.html
  // public links!: NodeListOf<Element>; //obtener por la clase de account-settings.component.html

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
    // this.links =  document.querySelectorAll('.selector');
    // this.checkCurrentTheme();
    this.settingsService.checkCurrentTheme();
  }

  changeTheme(theme: string){
    // const url = `./assets/css/colors/${theme}.css`;
    // this.linkTheme?.setAttribute('href',url);
    // localStorage.setItem('theme',url);
    // this.checkCurrentTheme();
    this.settingsService.changeTheme(theme);
  }

  // checkCurrentTheme(){
  //   this.links.forEach(elem => {
  //     elem.classList.remove('working');
  //     const btnTheme = elem.getAttribute('data-theme');
  //     const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
  //     const currentTheme = this.linkTheme?.getAttribute('href');
  //     if( btnThemeUrl === currentTheme ){
  //       elem.classList.add('working');
  //     }
  //   });
  // }

}
