import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transactionsservice } from '../../service/transactionsservice';
import { Transaction } from '../../model/transactions.model';
import { Accountsservice } from '../../service/accountsservice';
import { Accounts } from '../../model/accounts.model';
import { User } from '../../model/user.model';
import { TransactionType } from '../../model/transactionType.model';

@Component({
  selector: 'app-addtransaction',
  standalone: false,
  templateUrl: './addtransaction.html',
  styleUrl: './addtransaction.css'
})
export class Addtransaction {

transactionForm!: FormGroup;
  transactionType = TransactionType;
  token: string = localStorage.getItem('authToken') || '';

  constructor(
    private fb: FormBuilder,
    private transactionService: Transactionsservice,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    // Reactive Form 
    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      description: [''],
      receiverId: ['']  //For Transfer 
    });

    // browser refresh form value vanish hobe na
    const savedForm = localStorage.getItem('transactionForm');
    if (savedForm) {
      this.transactionForm.setValue(JSON.parse(savedForm));
    }

    // form value changes localStorage এ save
    this.transactionForm.valueChanges.subscribe(val => {
      localStorage.setItem('transactionForm', JSON.stringify(val));
    });
  }

  // Submit handler
  doTransaction() {
    if (this.transactionForm.invalid) {
      alert('Form is invalid! Please fill all required fields.');
      return;
    }

    const formValue = this.transactionForm.value;

    // Transaction Object
    const transaction: Transaction = {
      type: formValue.type,
      amount: formValue.amount,
      description: formValue.description,
      transactionTime: new Date(),  // backend optional, safe way
      accountId: 0 // backend automatically accountId token থেকে handle করবে
    };

    // Transfer হলে receiverId check
    if (formValue.type === this.transactionType.TRANSFER) {
      if (!formValue.receiverId) {
        alert('Receiver Account ID is required for Transfer!');
        return;
      }

      transaction.receiverAccountId = formValue.receiverId;

      // Transfer service call
      this.transactionService.transfer(transaction, formValue.receiverId).subscribe({
        next: res => {
          alert('Transfer Successful!');
          this.resetForm();
        },
        error: err => {
          console.error('Transfer failed:', err);
          alert(err.error?.message || 'Transfer Failed!');
        }
      });

    } else {
      // Deposit / Withdraw
      this.transactionService.makeTransaction(transaction).subscribe({
        next: res => {
          alert('Transaction Successful!');
          this.resetForm();
        },
        error: err => {
          console.error('Transaction failed:', err);
          alert(err.error?.message || 'Transaction Failed!');
        }
      });
    }
  }

  // Form reset & localStorage clear
  resetForm() {
    this.transactionForm.reset({ type: '', amount: 0, description: '', receiverId: '' });
    localStorage.removeItem('transactionForm');
  }





  // account!: Accounts;
  // transactionForm!: FormGroup;

  // transaction: Transaction = new Transaction();
  // senderId!: number;
  // receiverId?: number;
  // token: string = localStorage.getItem('token') || '';

  // constructor(
  //   private fb: FormBuilder,
  //   private transactionService: Transactionsservice,
  //   private accountService: Accountsservice,
  //   private cdRef: ChangeDetectorRef
  // ) { }

  // transactionType=TransactionType;

  // doTransaction() {
  //   if (this.transaction.type === this.transactionType.TRANSFER) {
  //     if (!this.receiverId) {
  //       alert("Receiver Account ID is required for transfer!");
  //       return;
  //     }

  //     // Set account IDs
  //     this.transaction.accountId = this.senderId;
  //     this.transaction.receiverAccountId = this.receiverId;

  //     //  Transfer call with sender & receiver IDs
  //     this.transactionService.transferOnly(this.transaction, this.senderId, this.receiverId, this.token)
  //       .subscribe({
  //         next: res => {
  //           console.log("Transfer success: ", res);
  //           alert("Transfer Successful!");
  //           this.resetForm();
  //         },
  //         error: err => {
  //           console.error("Transfer failed: ", err);
  //           alert(err.message || "Transfer Failed!");
  //         }
  //       });

  //   } else {
  //     // Deposit / Withdraw
  //     this.transaction.accountId = this.senderId;

  //     this.transactionService.makeTransaction(this.transaction, this.senderId, this.token)
  //       .subscribe({
  //         next: res => {
  //           console.log("Transaction success: ", res);
  //           alert("Transaction Successful!");
  //           this.resetForm();
  //         },
  //         error: err => {
  //           console.error("Transaction failed: ", err);
  //           alert(err.message || "Transaction Failed!");
  //         }
  //       });
  //   }
  // }

  // resetForm() {
  //   this.transaction = new Transaction();
  //   this.senderId = 0;
  //   this.receiverId = undefined;
  // }


}
