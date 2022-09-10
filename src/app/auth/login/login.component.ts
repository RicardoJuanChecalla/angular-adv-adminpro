import { Component, AfterViewInit, ViewChild, ElementRef, NgZone  } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [],
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements AfterViewInit {

  @ViewChild('googleBtn') googleBtn!: ElementRef;

  public formSubmitted = false;

  public loginForm = this.fb.group({
    email: [ (localStorage.getItem('email') || '') , [ Validators.required, Validators.email ] ],
    password: ['', [ Validators.required, Validators.minLength(3) ] ],
    remember: [false]
  });

  constructor(private fb: FormBuilder,
    private router: Router, 
    private userService: UserService,
    private ngZone: NgZone) { }

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit(){
    google.accounts.id.initialize({
      client_id: "535436683868-9lun66nuo8m82iepbsnlsv2638heravg.apps.googleusercontent.com",
      callback: (response: any) => this.handleCredentialResponse(response)
    });
    google.accounts.id.renderButton(
      this.googleBtn.nativeElement,
      { theme: "outline", size: "large" }  // customization attributes
    );
  }

  handleCredentialResponse(response: any){
    this.userService.loginGoogle(response.credential)
    .subscribe({
      next: (v) => {},
      error: (e) => { Swal.fire('Error',e.error.msg, 'error') },
      complete: () => this.ngZone.run( () => this.router.navigateByUrl('/') ) 
    });
  }  

  login(){
    this.userService.login(this.loginForm.value)
      .subscribe({
        next: (v) => {},
        error: (e) => { Swal.fire('Error',e.error.msg, 'error') },
        complete: () => {
          if( this.loginForm.get('remember')?.value){
            localStorage.setItem('email', this.loginForm.get('email')?.value! );
          }else{
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/');
        } 
      });
  }

}
