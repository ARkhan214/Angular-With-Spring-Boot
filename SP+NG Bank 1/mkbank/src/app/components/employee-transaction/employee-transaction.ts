import { Component, OnInit } from '@angular/core';
import { EmployeeTransactionService } from '../../service/employee-transaction-service';
import { Transaction } from '../../model/transactions.model';
import { TransactionType } from '../../model/transactionType.model';

@Component({
  selector: 'app-employee-transaction',
  standalone: false,
  templateUrl: './employee-transaction.html',
  styleUrl: './employee-transaction.css'
})
export class EmployeeTransaction implements OnInit {

  transactionType = TransactionType;

  transaction: Partial<Transaction> = {
    amount: 0,
    description: ''
    
  };

  accountId: number = 0;      // Deposit
  senderId: number = 0;       // Transfer
  receiverId: number = 0;     // Transfer

  successMessage: string = '';
  errorMessage: string = '';

  constructor(private transactionService: EmployeeTransactionService) { }

  ngOnInit() {
    const storedAccountId = localStorage.getItem('accountId');
    if (storedAccountId) {
      this.accountId = Number(storedAccountId);
      this.senderId = Number(storedAccountId); // senderId একই accountId ধরে নিচ্ছি
    }
  }

  deposit() {
    if (!this.accountId || !this.transaction.amount || !this.transaction.type) {
      this.errorMessage = 'Account ID, Amount, and Type are required!';
      return;
    }

    this.transactionService.deposit(this.transaction as Transaction, this.accountId)
      .subscribe({
        next: (res) => {
          this.successMessage = `Deposit successful: ${res.amount}`;
          this.errorMessage = '';
          this.transaction.amount = 0;
          this.transaction.description = '';
          this.transaction.type = undefined;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Deposit failed!';
          this.successMessage = '';
        }
      });
  }

  transfer() {
    if (!this.senderId || !this.receiverId || !this.transaction.amount || !this.transaction.type) {
      this.errorMessage = 'Sender, Receiver, Amount, and Type are required!';
      return;
    }

    this.transactionService.transfer(this.transaction as Transaction, this.senderId, this.receiverId)
      .subscribe({
        next: (res) => {
          this.successMessage = `Transfer successful: ${res.amount}`;
          this.errorMessage = '';
          this.transaction.amount = 0;
          this.transaction.description = '';
          this.transaction.type = undefined;
        },
        error: (err) => {
          console.error(err);
          this.errorMessage = 'Transfer failed!';
          this.successMessage = '';
        }
      });
  }
}
