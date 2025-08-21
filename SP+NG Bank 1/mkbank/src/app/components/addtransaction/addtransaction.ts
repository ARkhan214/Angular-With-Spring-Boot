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

  transaction: Transaction = new Transaction();
  senderId!: number;
  receiverId?: number;
  token: string = localStorage.getItem('token') || '';

  constructor(
    private fb: FormBuilder,
    private transactionService: Transactionsservice,
    private accountService: Accountsservice,
    private cdRef: ChangeDetectorRef
  ) { }

  doTransaction() {
    if (this.transaction.type === 'TRANSFER') {
      if (!this.receiverId) {
        alert("Receiver Account ID is required for transfer!");
        return;
      }

      // Set account IDs
      this.transaction.accountId = this.senderId;
      this.transaction.receiverAccountId = this.receiverId;

      // ✅ Transfer call with sender & receiver IDs
      this.transactionService.transferOnly(this.transaction, this.senderId, this.receiverId, this.token)
        .subscribe({
          next: res => {
            console.log("Transfer success: ", res);
            alert("Transfer Successful!");
            this.resetForm();
          },
          error: err => {
            console.error("Transfer failed: ", err);
            alert(err.message || "Transfer Failed!");
          }
        });

    } else {
      // Deposit / Withdraw
      this.transaction.accountId = this.senderId;

      this.transactionService.makeTransaction(this.transaction, this.senderId, this.token)
        .subscribe({
          next: res => {
            console.log("Transaction success: ", res);
            alert("Transaction Successful!");
            this.resetForm();
          },
          error: err => {
            console.error("Transaction failed: ", err);
            alert(err.message || "Transaction Failed!");
          }
        });
    }
  }

  resetForm() {
    this.transaction = new Transaction();
    this.senderId = 0;
    this.receiverId = undefined;
  }






  // doTransaction() {
  //   if (this.transaction.type === 'TRANSFER' && this.receiverId) {
  //     this.transactionService.transfer(this.transaction, this.senderId, this.receiverId, this.token)
  //       .subscribe({
  //         next: res => {
  //           console.log("Transfer success: ", res);
  //           alert("Transfer Successful!");
  //           this.resetForm();
  //         },
  //         error: err => {
  //           console.error("Transfer failed: ", err);
  //           alert("Transfer Failed!");
  //         }
  //       });
  //   } else {
  //     this.transactionService.makeTransaction(this.transaction, this.senderId, this.token)
  //       .subscribe({
  //         next: res => {
  //           console.log("Transaction success: ", res);
  //           alert("Transaction Successful!");
  //           this.resetForm();
  //         },
  //         error: err => {
  //           console.error("Transaction failed: ", err);
  //           alert("Transaction Failed!");
  //         }
  //       });
  //   }
  // }













//   ngOnInit(): void {
//   this.transactionForm = this.fb.group({
//     accountId: ['', Validators.required],
//     receiverAccountId: [''],
//     type: ['', Validators.required],
//     amount: [0, [Validators.required, Validators.min(1)]],
//     description: ['']
//   });

//     this.accountService.getAllAccountById(this.account.id!).subscribe({
//     next: (account) => {
//       if (account) {
//         this.account = account;
//         this.transactionForm.patchValue({ accountId: this.account.id });
//       }
//     },
//     error: (err) => console.error(err)
//   });
//   }




// onSubmit(): void {
//   //form validation check
//   if (this.transactionForm.invalid) {
//     console.warn('Transaction form is invalid!');
//     return;
//   }

// // Create a Transaction object from the form
//   const transaction: Transaction = {
//     type: this.transactionForm.value.type,
//     amount: this.transactionForm.value.amount,
//     description: this.transactionForm.value.description,
//     transactionTime: new Date(),
//     accountId: this.transactionForm.value.accountId,
//     receiverAccountId: this.transactionForm.value.receiverAccountId
//   };

//   this.transactionService.addTransaction(transaction).subscribe({
//     next: (res) => {
//       console.log('Transaction successful:', res);
      
//       //reset form after Success
//       this.transactionForm.reset({
//         accountId: this.account?.id || '',
//         receiverAccountId: '',
//         type: '',
//         amount: 0,
//         description: ''
//       });
//     },
//     error: (err) => {
//       console.error('Transaction failed:', err);
//       alert(err.message || 'Transaction failed!');
//     }
//   });
// }




}
