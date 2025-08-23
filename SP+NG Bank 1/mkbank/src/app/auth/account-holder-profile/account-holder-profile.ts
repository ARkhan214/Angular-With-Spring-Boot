import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Accounts } from '../../model/accounts.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Accountsservice } from '../../service/accountsservice';
import { AuthService } from '../../service/auth-service';

@Component({
  selector: 'app-account-holder-profile',
  standalone: false,
  templateUrl: './account-holder-profile.html',
  styleUrl: './account-holder-profile.css'
})
export class AccountHolderProfile implements OnInit {
  account!: Accounts;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private accountService: Accountsservice,
    private cdr: ChangeDetectorRef,
    private authService: AuthService
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




logout() {
    this.authService.logout();
  }

}
