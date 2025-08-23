import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Accountsservice } from '../../service/accountsservice';
import { Accounts } from '../../model/accounts.model';
import { UserService } from '../../service/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {

  accountId!: number;
  account!: Accounts;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: Accountsservice,
    private cdr:ChangeDetectorRef
  ) { }

    ngOnInit(): void {
    this.accountService.getProfile().subscribe({
      next: (data) => {
        this.account = data;
        console.log(data);
        this.cdr.markForCheck();

      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }

  // ngOnInit(): void {
  //   //id fron rout
  //   this.accountId = Number(this.route.snapshot.paramMap.get('id'));

  //   if (this.accountId) {
  //     this.accountService.  getAllAccountById(this.accountId).subscribe({
  //       next: (data) => {
  //         this.account = data;
  //         console.log('Account fetched:', this.account);
  //       },
  //       error: (err) => {
  //         console.error('Error fetching account:', err);
  //       }
  //     });
  //   } else {
  //     console.warn('No account ID provided in route');
  //   }
  // }
 
  // account!: Accounts;

  // constructor(
  //   private accountService: Accountsservice,
  //   private router: Router,
  //   private cdRef: ChangeDetectorRef,
  //   private route: ActivatedRoute
  // ) { }

  // ngOnInit() {
  //   const id = this.route.snapshot.paramMap.get('id'); // ID from route
  //   if (!id) {
  //     console.error('No account ID provided in route');
  //     return;
  //   }

  //   this.accountService.getAllAccountById(+id).subscribe({
  //     next: (data) => {
  //       this.account = data;
  //     },
  //     error: (err) => console.error(err)
  //   });
  // }


  logout() {
    alert('You have been logged out successfully!');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  viewStatement(): void {
    this.router.navigate(['/trst'], { queryParams: { accountId: this.account.id } });
  }



}
