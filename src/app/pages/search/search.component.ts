import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

import { Doctor } from 'src/app/models/doctor.model';
import { Hospital } from 'src/app/models/hospital.model';
import { User } from 'src/app/models/user.model';
import { SearchsService } from 'src/app/services/searchs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [
  ]
})
export class SearchComponent implements OnInit {

  public users: User[] = [];
  public doctors: Doctor[] = [];
  public hospitals: Hospital[] = [];

  constructor(private activatedRoute: ActivatedRoute,
    private searchsService: SearchsService) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( ({term}) => this.searchAll(term) );
  }

  searchAll(term: string){
    this.searchsService.searchAll(term)
    .subscribe({
      next: (resp: any) => {
        this.users = resp.users;
        this.hospitals = resp.hospitals;
        this.doctors = resp.doctors;
      },
      error: (e) => { Swal.fire('Error', e.error.msg, 'error') },
    });
  }

}
