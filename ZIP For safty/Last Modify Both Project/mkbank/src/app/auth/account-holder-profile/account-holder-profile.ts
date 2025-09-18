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
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.accountService.getProfile().subscribe({
      next: (data) => {
        this.account = data;
        console.log(data + "Profile data ");
        this.cdr.markForCheck();

      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }

  encodeURL(fileName: string): string {
    return encodeURIComponent(fileName);
  }


  logout() {
    this.authService.logout();
  }

}
