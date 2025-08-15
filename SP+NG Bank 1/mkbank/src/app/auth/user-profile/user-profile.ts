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

 
  account!: Accounts;

  constructor(
    private accountService: Accountsservice,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id) {
      this.accountService.getAllAccountById(id).subscribe({
        next: (acc: Accounts) => this.account = acc,
        error: (err) => console.error('Account fetch error:', err)
      });
    } else {
      console.error('No account ID provided in route');
    }
  }

  logout() {
    alert('You have been logged out successfully!');
    localStorage.removeItem('loggedInUser');
    this.router.navigate(['/login']);
  }

  viewStatement(): void {
    this.router.navigate(['/trst'], { queryParams: { accountId: this.account.id } });
  }



}
