import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { User } from '../../model/user.model';
import { Accountsservice } from '../../service/accountsservice';
import { Accounts } from '../../model/accounts.model';
import { UserService } from '../../service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  standalone: false,
  templateUrl: './user-profile.html',
  styleUrl: './user-profile.css'
})
export class UserProfile implements OnInit {

  user!: User;


  account !: Accounts;
  accId: string = '';

  constructor(
    private accountService: Accountsservice,
    private userService: UserService,
    private router: Router,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {

    // this.loadAccountDetails(this.account.id!);

    const data = localStorage.getItem('loggedInUser');
    if (data) {
      this.user = JSON.parse(data);

      // find user account
      this.accountService.findAccountByUserId(this.user.id!).subscribe(account => {
        if (account) {
          this.account = account;
          this.cdRef.markForCheck();
          console.log('Loaded account:', this.account);
        } else {
          console.warn('No account found for this user.');
        }
      });
    }


  }



  logout() {
    alert('You have been logged out successfully!');
    localStorage.removeItem('loggedInUser');
    window.location.href = '/login';
  }



  loadAccountDetails(id: string): void {

    this.accountService.getAllAccountById(id).subscribe({
      next: (acc: Accounts) => {
        this.account = acc;
      },

    })
  }

  //new method for statement
  viewStatement(): void {
    this.router.navigate(['/trst'], {
      queryParams: { accountId: this.account.id }
    });
  }


    getLoginUserDetails() {
    localStorage.getItem('loggedInUser');
    console.log(localStorage.getItem('loggedInUser'));

  }



}
