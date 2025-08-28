import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Transactionsservice } from '../../service/transactionsservice';
import { Transaction } from '../../model/transactions.model';
import { TransactionType } from '../../model/transactionType.model';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-addtransaction',
  standalone: false,
  templateUrl: './addtransaction.html',
  styleUrl: './addtransaction.css'
})
export class Addtransaction {

  transactionForm!: FormGroup;
  transactionType = TransactionType;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: Transactionsservice,
    private cdRef: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    // Browser-only token fetch
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('authToken') || '';
    }

    // Reactive form setup
    this.transactionForm = this.fb.group({
      type: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
      description: [''],
      receiverId: ['']
    });

    // Load saved form data from localStorage
    if (isPlatformBrowser(this.platformId)) {
      const savedForm = localStorage.getItem('transactionForm');
      if (savedForm) {
        this.transactionForm.patchValue(JSON.parse(savedForm));
      }

      // Auto-save form on changes
      this.transactionForm.valueChanges.subscribe(val => {
        localStorage.setItem('transactionForm', JSON.stringify(val));
      });
    }
  }

  // Submit handler
  onSubmit() {
    if (this.transactionForm.invalid) {
      alert('Form is invalid! Please fill all required fields.');
      return;
    }

    const formValue = this.transactionForm.value;

    // Build transaction object
    const transaction: Transaction = {
      type: formValue.type,
      amount: formValue.amount,
      description: formValue.description,
      transactionTime: new Date(),
      accountId: 0 // backend will handle accountId from token
    };

    if (formValue.type === this.transactionType.TRANSFER) {
      if (!formValue.receiverId) {
        alert('Receiver Account ID is required for Transfer!');
        return;
      }
      transaction.receiverAccountId = formValue.receiverId;

      // Transfer call
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

    }
    //  else {
    //   // Deposit / Withdraw
    //   this.transactionService.makeTransaction(transaction).subscribe({
    //     next: res => {
    //       alert('Transaction Successful!');
    //       this.resetForm();
    //     },
    //     error: err => {
    //       console.error('Transaction failed:', err);
    //       alert(err.error?.message || 'Transaction Failed!');
    //     }
    //   });
    // }
  }

  // Reset form + clear localStorage
  resetForm() {
    this.transactionForm.reset({
      type: '',
      amount: 0,
      description: '',
      receiverId: ''
    });
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('transactionForm');
    }
  }

}
