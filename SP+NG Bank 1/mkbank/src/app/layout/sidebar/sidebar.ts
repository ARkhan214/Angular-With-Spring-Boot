import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  //    userType: string = '';

  // constructor(
  //   private userService: UserService
  // ){}

  // ngOnInit(): void {
  //   this.userService.currentUser$.subscribe(user=>{
  //     this.userType = user?.type || '';
  //   })
  // }

}
