import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Accountsservice } from '../../service/accountsservice';
import { Accounts } from '../../model/accounts.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin-profile',
  standalone: false,
  templateUrl: './admin-profile.html',
  styleUrl: './admin-profile.css'
})
export class AdminProfile implements OnInit {
adminId!: number;
admin!:User;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    //id fron rout
    this.adminId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.adminId) {
      this.userService.getUserById(this.adminId).subscribe({
        next: (data) => {
          this.admin = data;
          console.log('Account fetched:', this.adminId);
        },
        error: (err) => {
          console.error('Error fetching account:', err);
        }
      });
    } else {
      console.warn('No account ID provided in route');
    }
  }



  // admin!: User;
  // constructor(
  //   private router: Router

  // ) {}

  // ngOnInit(): void {
  //   const data = localStorage.getItem('loggedInUser');
  //   if (data) {
  //     this.admin = JSON.parse(data);
  //   }
   
  // }

  logout() {
    alert('You have been logged out successfully!');
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
    // this.router.navigate(['/login']);
  }
}
