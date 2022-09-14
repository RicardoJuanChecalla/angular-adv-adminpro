import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { FileUploadService } from 'src/app/services/file-upload.service';
import { ImageModalService } from 'src/app/services/image-modal.service';

@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styles: [
  ]
})
export class ImageModalComponent implements OnInit {

  // public hideModal: boolean = false;

  constructor(public imageModalService: ImageModalService,
    private fileUploadService: FileUploadService ) { }

  public imageToUpload!: File;
  public imgTemp: any = null;

  ngOnInit(): void {
  }

  closeModal(){
    // this.hideModal = true;
    this.imgTemp = null;
    this.imageModalService.closeModal();
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
      .updateImage( this.imageToUpload, this.imageModalService.type , this.imageModalService.uid )
      .then( img => {
        Swal.fire('success', 'saved image','success');
        this.imageModalService.newImage.emit(img);
        this.closeModal();
      } )
      .catch(
        (err) => Swal.fire('Error',err.error.msg, 'error')
      );
  }
}
