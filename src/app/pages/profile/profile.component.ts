import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: [
  ]
})
export class ProfileComponent implements OnInit {

  public user!: User;
  public profileForm!: FormGroup;
  public imageToUpload!: File;
  public imgTemp: any = null;

  constructor( private fb: FormBuilder, 
    private userService: UserService,
    private fileUploadService: FileUploadService ) {
      this.user = userService.user;
  }

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      name: [ this.user.name, Validators.required],
      email: [ this.user.email, [Validators.required, Validators.email]],
    });
  }

  updateProfile(){
    this.userService.updateProfile(this.profileForm.value)
      .subscribe({
        next: (v:any) => {
          const {name, email} = v.user;
          this.user.name = name;
          this.user.email = email;
        },
        error: (e) => { Swal.fire('Error',e.error.msg, 'error') },
        complete: () => { Swal.fire('success', 'Your work has been saved','success')}
      });
  }

  selectImage(event: any){
    this.imageToUpload = event.target.files[0];
    if ( !this.imageToUpload ) { 
      this.imgTemp = null;
    }else{
      const reader = new FileReader();
      reader.readAsDataURL( this.imageToUpload );
  
      reader.onloadend = () => {
        this.imgTemp = reader.result;
      }
    }
  }

  updateImage(){
    this.fileUploadService
      .updateImage( this.imageToUpload, 'users', this.user.uid || '' )
      .then( img => {
        this.user.image = img;
        Swal.fire('success', 'saved image','success')
      } )
      .catch(
        (err) => Swal.fire('Error',err.error.msg, 'error')
      );
  }

}
