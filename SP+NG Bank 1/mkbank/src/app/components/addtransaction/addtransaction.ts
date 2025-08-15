import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transactionsservice } from '../../service/transactionsservice';
import { Transaction } from '../../model/transactions.model';
import { Accountsservice } from '../../service/accountsservice';
import { Accounts } from '../../model/accounts.model';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-addtransaction',
  standalone: false,
  templateUrl: './addtransaction.html',
  styleUrl: './addtransaction.css'
})
export class Addtransaction {
  account!: Accounts;
  transactionForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private transactionService: Transactionsservice,
    private accountService: Accountsservice,
    private cdRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
  this.transactionForm = this.fb.group({
    accountId: ['', Validators.required],
    receiverAccountId: [''],
    type: ['', Validators.required],
    amount: [0, [Validators.required, Validators.min(1)]],
    description: ['']
  });

    this.accountService.getAllAccountById(this.account.id!).subscribe({
    next: (account) => {
      if (account) {
        this.account = account;
        this.transactionForm.patchValue({ accountId: this.account.id });
      }
    },
    error: (err) => console.error(err)
  });
  }




onSubmit(): void {
  //form validation check
  if (this.transactionForm.invalid) {
    console.warn('Transaction form is invalid!');
    return;
  }

// Create a Transaction object from the form
  const transaction: Transaction = {
    type: this.transactionForm.value.type,
    amount: this.transactionForm.value.amount,
    description: this.transactionForm.value.description,
    transactionTime: new Date(),
    accountId: this.transactionForm.value.accountId,
    receiverAccountId: this.transactionForm.value.receiverAccountId
  };

  this.transactionService.addTransaction(transaction).subscribe({
    next: (res) => {
      console.log('Transaction successful:', res);
      
      //reset form after Success
      this.transactionForm.reset({
        accountId: this.account?.id || '',
        receiverAccountId: '',
        type: '',
        amount: 0,
        description: ''
      });
    },
    error: (err) => {
      console.error('Transaction failed:', err);
      alert(err.message || 'Transaction failed!');
    }
  });
}















  // onSubmit(): void {
  //   if (this.transactionForm.invalid) return;

  //   const transaction: Transaction = {
  //     type: this.transactionForm.value.type,
  //     amount: this.transactionForm.value.amount,
  //     description: this.transactionForm.value.description,
  //     transactionTime: new Date(),
  //     accountId: this.transactionForm.value.accountId,
  //     receiverAccountId: this.transactionForm.value.receiverAccountId
  //   };

  //   // Sender Transaction
  //   this.transactionService.addTransactionWithBalance(transaction).subscribe({
  //     next: () => {
  //       if (transaction.type === 'TRANSFER') {
  //         const receiverTransaction: Transaction = {
  //           type: 'RECEIVE',
  //           amount: transaction.amount,
  //           description: transaction.description,
  //           transactionTime: new Date(),
  //           accountId: transaction.receiverAccountId!,
  //           receiverAccountId: transaction.accountId
  //         };

  //         this.transactionService.addTransactionWithBalance(receiverTransaction).subscribe({
  //           next: () => {
  //             alert('Transaction added for both sender and receiver!');
  //             this.transactionForm.reset();
  //           },
  //           error: (err) => {
  //             if (err.message.includes('closed')) {
  //               alert('Receiver account is closed!');
  //             }
  //             alert('Receiver Transaction Error: ' + err.message);
  //           }
  //         });
  //       } else {
  //         alert('Transaction added & balance updated!');
  //         this.transactionForm.reset();
  //       }
  //     },
  //     error: (err) => {
  //       if (err.message.includes('closed')) {
  //         alert('Sender account is closed!');
  //       }
  //       alert('Sender Transaction Error: ' + err.message);
  //     }
  //   });
  // }




}
