import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Accountsservice } from '../../service/accountsservice';
import { Router } from '@angular/router';
import { UserService } from '../../service/user.service';
import { Accounts } from '../../model/accounts.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-view-all-accounts',
  standalone: false,
  templateUrl: './view-all-accounts.html',
  styleUrl: './view-all-accounts.css'
})
export class ViewAllAccounts implements OnInit {

  account: Accounts[] = [];
  filteredAccount: Accounts[] = [];
  searchAccountId: string = '';

  constructor(
    private accounService: Accountsservice,
    private userService: UserService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.accounService.getAllAccount().subscribe(accounts => {
      const updatedAccounts: any[] = [];
      let processed = 0;

      accounts.forEach(acc => {
        this.userService.getUserById(acc.userId!).subscribe(user => {
          acc.userName = user.name;
          acc.photoUrl = user.photoUrl;

          updatedAccounts.push(acc);
          processed++;

          if (processed === accounts.length) {
            this.account = [...updatedAccounts];
            this.filteredAccount = [...updatedAccounts]; // 👈 Filtered list set
            this.cdr.markForCheck();
          }
        });
      });
    });
  }

  filterAccounts(): void {
    const search = this.searchAccountId.trim().toLowerCase();
    if (search === '') {
      this.filteredAccount = [...this.account]; // reset
    } else {
      this.filteredAccount = this.account.filter(acc =>
        acc.id?.toLowerCase().includes(search)
      );
    }
   
  }

deleteAccount(id: string): void {
  const confirmed = window.confirm('Are you sure you want to delete this account? This action cannot be undone.');

  if (!confirmed) {
    return; // user cancelled
  }

  this.accounService.deleteAccount(id).subscribe({
    next: () => {
      console.log('Account deleted');
      this.loadData();
      this.cdr.markForCheck();
    },
    error: (err) => {
      console.log('Error deleting User: ', err);
    }
  });
}


  closeAccount(id: string): void {
    const conform=window.confirm('Are you sure you want to close this account?');
    if(!conform){
      return;
    }


    this.accounService.closeAccount(id).subscribe({
      next: () => {
        this.loadData();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log('Error closing account:', err);
      }
    });
  }

  openAccount(id: string): void {
    this.accounService.openAccount(id).subscribe({
      next: () => {
        this.loadData();
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log('Error opening account:', err);
      }
    });
  }

}
