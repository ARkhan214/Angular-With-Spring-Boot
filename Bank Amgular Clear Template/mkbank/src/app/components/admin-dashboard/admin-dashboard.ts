import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Accountsservice } from '../../service/accountsservice';
import { Transactionsservice } from '../../service/transactionsservice';
import { Accounts } from '../../model/accounts.model';
import { Transaction } from '../../model/transactions.model';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: false,
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css'
})
export class AdminDashboard implements OnInit {

  totalAccounts: number = 0;
  totalDeposit: number = 0;
  totalWithdraw: number = 0;
  totalUsers: number = 0;

  constructor(
    private accountService: Accountsservice,
    private userService:UserService,
    private transactionService: Transactionsservice,
    private cdr:ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    //  Total Accounts
    this.accountService.getAllAccounts().subscribe({
      next: (accounts) => {
        this.totalAccounts = accounts.length;
         this.cdr.markForCheck();
      }
    });

    //  Total Users
    this.userService.getAllUser().subscribe({
      next: (user) => {
        this.totalUsers = user.length;
         this.cdr.markForCheck();
      }
    });

    //  Total Deposit (positive)
    this.transactionService.getPositiveTransactions().subscribe({
      next: (transactions) => {
        this.totalDeposit = transactions
          .map(t => t.amount)
          .reduce((acc, curr) => acc + curr, 0);
           this.cdr.markForCheck();
      }
    });

    //  Total Withdraw (negative)
   this.transactionService.getWithdrawTransactions().subscribe({
  next: (transactions) => {
    console.log('Withdraw Transactions:', transactions); // এখন দেখতে পাবে
    this.totalWithdraw = transactions
      .map(t => t.amount) // positive value
      .reduce((acc, curr) => acc + curr, 0);
       this.cdr.markForCheck();
  },
  error: (err) => {
    console.error('Withdraw fetch failed:', err);
  }
});

 
  }
}
