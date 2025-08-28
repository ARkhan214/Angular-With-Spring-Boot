import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { AuthService } from '../../service/auth-service';
import { Role } from '../../model/role.model';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar implements OnInit {


  userRole: string | null = null;

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) { }

  //   ngOnInit(): void {
  //   this.userService.currentUser$.subscribe(user=>{
  //     this.userRole = user?.role || '';
  //   })
  // }

  // ngOnInit(): void {
  //   this.userRole = this.authService.getUserRole();
  //   console.log('Sidebar loaded with role:', this.userRole);
  // }

  ngOnInit(): void {
    this.authService.userRole$.subscribe(role => {
      this.userRole = role;
      console.log('Sidebar loaded with role:', this.userRole);
    });
  }



  logout() {
    this.authService.logout();
  }


  isAdmin(): boolean {
    return this.userRole === Role.ADMIN;
  }

  isUser(): boolean {
    return this.userRole === Role.USER;
  }

  isEmployee(): boolean {
    return this.userRole === Role.EMPLOYEE;
  }


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
