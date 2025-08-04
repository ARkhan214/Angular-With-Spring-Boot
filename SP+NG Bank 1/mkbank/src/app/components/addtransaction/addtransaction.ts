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
  user!: User;
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

    const data = localStorage.getItem('loggedInUser');
    if (data) {
      this.user = JSON.parse(data);
      this.accountService.findAccountByUserId(this.user.id!).subscribe(account => {
        if (account) {
          this.account = account;

          // If you want to prefill accountId:
          this.transactionForm.patchValue({ accountId: this.account.id });

          this.cdRef.markForCheck();
        } else {
          console.warn('No account found for this user.');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.transactionForm.invalid) return;

    const transaction: Transaction = {
      type: this.transactionForm.value.type,
      amount: this.transactionForm.value.amount,
      description: this.transactionForm.value.description,
      transactiontime: new Date(),
      accountId: this.transactionForm.value.accountId,
      receiverAccountId: this.transactionForm.value.receiverAccountId
    };

    // Sender Transaction
    this.transactionService.addTransactionWithBalance(transaction).subscribe({
      next: () => {
        if (transaction.type === 'Transfer') {
          const receiverTransaction: Transaction = {
            type: 'Receive',
            amount: transaction.amount,
            description: transaction.description,
            transactiontime: new Date(),
            accountId: transaction.receiverAccountId!,
            receiverAccountId: transaction.accountId
          };

          this.transactionService.addTransactionWithBalance(receiverTransaction).subscribe({
            next: () => {
              alert('Transaction added for both sender and receiver!');
              this.transactionForm.reset();
            },
            error: (err) => {
              if (err.message.includes('closed')) {
                alert('Receiver account is closed!');
              }
              alert('Receiver Transaction Error: ' + err.message);
            }
          });
        } else {
          alert('Transaction added & balance updated!');
          this.transactionForm.reset();
        }
      },
      error: (err) => {
        if (err.message.includes('closed')) {
          alert('Sender account is closed!');
        }
        alert('Sender Transaction Error: ' + err.message);
      }
    });
  }

}
