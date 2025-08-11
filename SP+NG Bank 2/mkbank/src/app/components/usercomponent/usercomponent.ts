import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { Accounts } from '../../model/accounts.model';
import { Accountsservice } from '../../service/accountsservice';
import { Transactionsservice } from '../../service/transactionsservice';

@Component({
  selector: 'app-usercomponent',
  standalone: false,
  templateUrl: './usercomponent.html',
  styleUrl: './usercomponent.css'
})
export class Usercomponent implements OnInit {

  userAccountForm !: FormGroup

  constructor(
    private userService: UserService,
    private accountService: Accountsservice,
    private formbuilder: FormBuilder,
    private transactionService: Transactionsservice,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userAccountForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      type: ['savings', Validators.required],
      balance: ['', Validators.required],
      photoUrl: ['']   // For Photo
    });
  }

  onSubmit() {
    if (this.userAccountForm.valid) {
      const { name, email, password, type, balance, photoUrl } = this.userAccountForm.value;

      const newUser: User = { name, email, password, type, photoUrl };

      // 1. Save User First
      this.userService.saveAllUser(newUser).subscribe(savedUser => {
        const newAccount: Accounts = {
          userId: savedUser.id!,
          userName: savedUser.name,
          type,
          balance :0,
          
        };

        // 2. Save Account
        this.accountService.addAccount(newAccount).subscribe(savedAccount => {
          console.log('User saved:', savedUser);
          console.log('Account saved:', savedAccount);

          // ✅ 3. Create Initial Deposit Transaction
          const initialTransaction = {
            type: 'Deposit' as const,  // tells TS this is the literal "Deposit"
            amount: balance,
            description: 'Initial Deposit',
            transactiontime: new Date(),
            accountId: savedAccount.id!
          };


          // 4. Save the transaction
          this.transactionService.addTransactionWithBalance(initialTransaction).subscribe({
            next: () => {
              console.log('Initial deposit transaction saved');
              this.userAccountForm.reset();
              alert('User, account, and initial deposit transaction saved!');
            },
            error: err => {
              console.error('Transaction error:', err);
              alert('Failed to save initial deposit transaction.');
            }
          });
        });
      });
    }
  }


  loadUserWithAccounts(userId: string) {
    this.userService.getUserById(userId).subscribe(user => {
      this.accountService.getAccountsByUserId(userId).subscribe(accounts => {
        console.log('User:', user);
        console.log('Accounts:', accounts);
      });
    });
  }

}
