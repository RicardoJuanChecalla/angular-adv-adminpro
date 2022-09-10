import { Component, NgZone } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  
  public formSubmitted = false;

  constructor(private fb: FormBuilder,
      private userService: UserService,
      private router: Router,
      private ngZone: NgZone) { }

  public registerForm = this.fb.group({
    name: ['Ricardo', [ Validators.required, Validators.minLength(3) ] ],
    email: ['ricardie777@gmail.com', [ Validators.required, Validators.email ] ],
    password: ['123456', [ Validators.required, Validators.minLength(3) ] ],
    password2: ['123456', [ Validators.required, Validators.minLength(3) ] ],
    term: [false, [ Validators.required, this.acceptTerm] ],
  },{
    validators: [ this.samePassword('password','password2') ]
  });

  createUser(){
    this.formSubmitted = true;
    if(this.registerForm.invalid){
      return;
    }
    this.userService.createUser(this.registerForm.value)
      .subscribe({
        next: (v) => console.log(v),
        error: (e) => { Swal.fire('Error',e.error.msg, 'error') },
        complete: () => this.ngZone.run( () => this.router.navigateByUrl('/') ) 
      });

  }

  invalidField( field: string): boolean{
    if(this.registerForm.get(field)?.invalid && this.formSubmitted){
      return true
    }else
    {
      return false;
    }  
  }

  acceptTerms(): boolean{
    return !(this.registerForm.get('term')?.value??false) && this.formSubmitted;
  }

  invalidPassword(): boolean{
    const pass1 = this.registerForm.get('password')?.value??false;
    const pass2 = this.registerForm.get('password2')?.value??false;
    return (pass1 !== pass2) && this.formSubmitted;
  }

  samePassword(campo1: string, campo2: string){
    return (formGroup: AbstractControl): ValidationErrors | null =>{
      const pass1 = formGroup.get(campo1)?.value;
      const pass2 = formGroup.get(campo2)?.value;
      if( pass1 !== pass2 ){
        formGroup.get(campo2)?.setErrors({noIguales: true});
        return { noIguales: true }
      }
      formGroup.get(campo2)?.setErrors(null);
      return null;
    }
  }

  acceptTerm ( control: FormControl ): ValidationErrors | null {
    const valor: boolean = control.value;
    if(valor === false){
      return {
        noAcceptTerm: true
      }
    }
    return null;
  }

}
