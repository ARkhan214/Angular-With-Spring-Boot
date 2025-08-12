import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Router } from '@angular/router';
import { Accountsservice } from '../../service/accountsservice';
import { Accounts } from '../../model/accounts.model';

@Component({
  selector: 'app-admin-profile',
  standalone: false,
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css'
})
export class AdminProfile implements OnInit {
  admin!: User;

 

  constructor(
    private router: Router

  ) {}

  ngOnInit(): void {
    const data = localStorage.getItem('loggedInUser');
    if (data) {
      this.admin = JSON.parse(data);
    }
   
  }

  logout() {
    alert('You have been logged out successfully!');
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
    // this.router.navigate(['/login']);
  }
}
