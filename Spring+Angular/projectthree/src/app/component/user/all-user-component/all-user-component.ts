import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../service/user.service';
import { User } from '../../../model/user.model';

@Component({
  selector: 'app-all-user-component',
  standalone: false,
  templateUrl: './all-user-component.html',
  styleUrl: './all-user-component.css'
})
export class AllUserComponent implements OnInit{
 users : User []= [];

    constructor(
      private userService:UserService
    ){}

     ngOnInit(): void {
    this.loadData();

  }

    loadData(){
    this.userService.getAllUser().subscribe({
      next:(res)=>{this.users=res;},
      error:(err)=>{console.log(err);}
    });
  }

  viewUser(id: number) {
  this.userService.getUserById(id).subscribe({
    next: (user) => {
      alert(`User: ${user.name}\nEmail: ${user.email}`);
      
    },
    error: (err) => {
      alert('User not found!');
      console.error(err);
    }
  });
}


deleteUser(id: number) {
  if (confirm('Are you sure to delete?')) {
    this.userService.deleteUserById(id).subscribe(() => {
      alert('User deleted successfully');
      this.loadData();
    });
  }
}
}
