import { Component, OnDestroy, OnInit } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { SearchsService } from 'src/app/services/searchs.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styles: [
  ]
})
export class HospitalComponent implements OnInit, OnDestroy {

  public hospitals: Hospital[] = [];
  public hospitalsTemp: Hospital[] = [];
  public loadUp: boolean = true;
  private imgSubs!: Subscription;

  constructor(private hospitalService: HospitalService,
    private imageModalService: ImageModalService,
    private searchService: SearchsService) { }

  ngOnInit(): void {
    this.loadHospital();
    this.imgSubs = this.imageModalService.newImage.pipe(delay(100)).subscribe(()=>this.loadHospital());
  }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  loadHospital(){
    this.loadUp = true;
    this.hospitalService.loadHospitals().subscribe( hospitals => {
      this.loadUp = false;
      this.hospitals = hospitals;
      this.hospitalsTemp =  hospitals;
    });
  }

  saveChanges(hospital: Hospital){
    this.hospitalService.updateHospital( hospital.name, hospital._id)
    .subscribe({
      next: (v:any) => { console.log(v) },
      error: (e) => {Swal.fire('Error', e.error.msg, 'error') },
      complete: () => { Swal.fire('success', 'Your work has been saved', 'success')}
    });
  }

  deleteRegister(id: string){
    this.hospitalService.deleteHospital(id)
    .subscribe({
      next: (v:any) => { this.loadHospital() },
      error: (e) => {Swal.fire('Error', e.error.msg, 'error') },
      complete: () => { Swal.fire('success', 'Your work has been saved', 'success')}
    });
  }

  async openSweetAlert() {
    const { value = '' } = await Swal.fire<string>({
      title: 'create hospital',
      text: 'Enter the name of the new hospital',
      input: 'text',
      inputPlaceholder: 'hospital name',
      showCancelButton: true,
    });
    
    if( value.trim().length > 0 ) {
      this.hospitalService.createHospital( value )
      .subscribe({
        next: (resp :any) => { this.hospitals.push( resp.hospital ) },
        error: (e) => {Swal.fire('Error', e.error.msg, 'error') },
        complete: () => { Swal.fire('success', 'Your work has been saved', 'success')}
      });
    }
  }

  openModal(hospital: Hospital) {
    this.imageModalService.openModal( 'hospitals', hospital._id, hospital.image );
  }

  search(term: string){
    if(term.length<=2){
      this.hospitals = this.hospitalsTemp;
    }else {
      this.searchService.searchByHospital(term).subscribe({
        next: (resp: Hospital[]) => {this.hospitals = resp},
        error: (e) => { Swal.fire('Error',e.error.msg, 'error') },
        // complete: () => console.log('Observer got a complete notification'),
      })

    }
  }

}
