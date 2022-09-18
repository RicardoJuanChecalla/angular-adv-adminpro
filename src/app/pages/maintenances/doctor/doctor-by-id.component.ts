import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { DoctorService } from 'src/app/services/doctor.service';
import { HospitalService } from 'src/app/services/hospital.service';


@Component({
  selector: 'app-doctor-by-id',
  templateUrl: './doctor-by-id.component.html',
  styles: [
  ]
})
export class DoctorByIdComponent implements OnInit {

  public doctorForm!: FormGroup;
  public hospitales: Hospital[] = [];
  // public selectedHospital: Hospital | undefined = undefined;
  public selectedHospital!: Hospital;
  public selectedDoctor!: Doctor;

  constructor(private fb: FormBuilder,
    private hospitalService: HospitalService,
    private doctorService: DoctorService,
    private router: Router,
    private activatedRoute: ActivatedRoute ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({id}) => this.loadDoctor(id));

    this.loadHospitals();
    this.doctorForm = this.fb.group({
      name: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    this.doctorForm.get('hospital')!.valueChanges
      .subscribe( ( id: string ) => {
        const prueba = this.hospitales.find( h => h._id === id );
        this.selectedHospital = prueba!;
      });
  }

  loadDoctor(id: string){
    if(id === 'new'){
      return;
    }
    this.doctorService.getDoctorById(id)
    .subscribe({
      next: (doctor: any) => {
        if(!doctor){
         this.router.navigateByUrl(`/dashboard/doctors`); 
        }else{
          const { name, hospital: { _id } } = doctor;
          this.doctorForm.setValue({name, hospital: _id});
          this.selectedDoctor = doctor   
        }
      },
      error: (e) => { Swal.fire('Error', e.error.msg, 'error') }
    });
  }
  
  loadHospitals(){
    this.hospitalService.loadHospitals()
      .subscribe( (hospitals: Hospital[]) => this.hospitales = hospitals );
  }

  saveChanges(){
    if ( this.selectedDoctor ) {
      const data = {
        ...this.doctorForm.value,
        _id: this.selectedDoctor._id
      }
      this.doctorService.updateDoctor( data )
        .subscribe({
          error: (e) => {Swal.fire('Error', e.error.msg, 'error') },
          complete: () => { Swal.fire('success', 'Your work has been saved', 'success')}
        });

    } else {
      this.doctorService.createDoctor( this.doctorForm.value )
      .subscribe({
        next: (resp:any) => { this.router.navigateByUrl(`/dashboard/doctors/${ resp.doctor._id }`) },
        error: (e) => {Swal.fire('Error', e.error.msg, 'error') },
        complete: () => { Swal.fire('success', 'Your work has been saved', 'success')}
      });
    }

  }

}
