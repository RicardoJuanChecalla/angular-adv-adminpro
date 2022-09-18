import { Component, OnDestroy, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { LoadUser } from 'src/app/interfaces/load-users.interface';
import { SearchsService } from 'src/app/services/searchs.service';
import { ImageModalService } from 'src/app/services/image-modal.service';
import { delay, Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styles: [
  ]
})

export class UserComponent implements OnInit, OnDestroy {

  public totalUsers: number = 0;
  public users: User[] = [];
  public usersTemp: User[] = [];
  public from: number = 0;
  public loadDown: boolean = false;
  public imgSubs!: Subscription;

  constructor(private userService: UserService,
    private searchService: SearchsService,
    private imageModalService: ImageModalService ) { }

    ngOnDestroy(): void {
    this.imgSubs.unsubscribe();
  }

  ngOnInit(): void {
    this.loadUsers();
    this.imgSubs = this.imageModalService.newImage.pipe(delay(100)).subscribe(()=>this.loadUsers());
  }

  loadUsers(){
    this.loadDown =  true;
    this.userService.loadUsers(this.from)
    .subscribe({
      next: (v: LoadUser) => {
        this.totalUsers = v.total;
        this.users = v.users;
        this.loadDown =  false;
        this.usersTemp = v.users; 
      },
      error: (e) => { Swal.fire('Error',e.error.msg, 'error') },
    });
  }

  changePage(value: number){
    this.from += value;
    if ( this.from < 0 ) {
      this.from = 0;
    } else if ( this.from >= this.totalUsers ) {
      this.from -= value; 
    }
    this.loadUsers();
  }

  search(term: string){
    if(term.length<=2){
      this.users = this.usersTemp;
    }else {
      this.searchService.searchByUser(term)
      .subscribe({
        next: (result: User[]) => { this.users = result },
        error: (e) => { Swal.fire('Error',e.error.msg, 'error') },
      });
    }
  }

  deleteUser(user: User){
    if(user.uid === this.userService.uid ){
      Swal.fire('Validation', "can't erase itself" , 'warning') 
    }else{
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
          if (result.isConfirmed) {
            this.userService.deleteUser(user.uid!).subscribe({
              next: () => this.loadUsers(),
              error: (e) => { Swal.fire('Error', e.error.msg, 'error') },
              complete: () => { Swal.fire( 'Deleted!', 'Your file has been deleted.', 'success')},
            });
          }
        });
    }
  }

  changeRole(user: User){
    this.userService.updateUser(user).subscribe({
      // next: () => this.loadUsers(),
      error: (e) => { Swal.fire('Error', e.error.msg, 'error') },
      // complete: () => { Swal.fire( 'Deleted!', 'Your file has been deleted.', 'success')},
    });
  }

  openModal(user: User){
    this.imageModalService.openModal('users', user.uid!, user.imageUrl);
  }
}
