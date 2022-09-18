import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { SearchsService } from 'src/app/services/searchs.service';
import { ImageModalService } from 'src/app/services/image-modal.service';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styles: [
  ]
})
export class DoctorComponent implements OnInit, OnDestroy {

  public doctors: Doctor[] = [];
  public doctorsTemp: Doctor[] = [];
  public loadUp: boolean = true;
  private imgSubs!: Subscription;

  constructor(private doctorService: DoctorService,
    private imageModalService: ImageModalService,
    private searchService: SearchsService) { }

  ngOnInit(): void {
    this.loadDoctor();
    this.imgSubs = this.imageModalService.newImage.pipe(delay(100)).subscribe(()=>this.loadDoctor());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadDoctor(){
    this.loadUp = true;
    this.doctorService.loadDoctors().subscribe( doctors => {
      this.loadUp = false;
      this.doctors = doctors;
      this.doctorsTemp =  doctors;
    });
  }
  
  openModal(doctor: Doctor) {
    this.imageModalService.openModal( 'doctors', doctor._id, doctor.image );
  }

  search(term: string){
    if(term.length<=2){
      this.doctors = this.doctorsTemp;
    }else {
      this.searchService.searchByDoctor(term).subscribe({
        next: (resp: Doctor[]) => {this.doctors = resp},
        error: (e) => { Swal.fire('Error',e.error.msg, 'error') },
        // complete: () => console.log('Observer got a complete notification'),
      })

    }
  }

  deleteDoctor(id: string){
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          this.doctorService.deleteDoctor(id).subscribe({
            next: () => this.loadDoctor(),
            error: (e) => { Swal.fire('Error', e.error.msg, 'error') },
            complete: () => { Swal.fire( 'Deleted!', 'Your file has been deleted.', 'success')},
          });
        }
      });
  }

}
