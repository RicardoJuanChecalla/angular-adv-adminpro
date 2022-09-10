import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

declare const google: any; 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})

export class HeaderComponent implements OnInit {

  constructor( private userService: UserService, private router: Router ) { }

  ngOnInit(): void {
  }

  logout(){
    this.userService.logout();
    google.accounts.id.revoke('ricardie777@gmail.com', ()=>{
      this.router.navigateByUrl('/login');
    });
    // this.router.navigateByUrl('/login');
  }

}
