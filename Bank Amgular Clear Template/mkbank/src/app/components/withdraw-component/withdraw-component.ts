import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { WithdrawService } from '../../service/withdraw.service';
import { Accountsservice } from '../../service/accountsservice';
import { Withdraw } from '../../model/withdraw.model';
import { Transactionsservice } from '../../service/transactionsservice';
import { Transaction } from '../../model/transactions.model';

@Component({
  selector: 'app-withdraw-component',
  standalone: false,
  templateUrl: './withdraw-component.html',
  styleUrl: './withdraw-component.css'
})
export class WithdrawComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  // formGroup !: FormGroup;

  // constructor(
  //   private formBuilder: FormBuilder,
  //   private withdrawService: WithdrawService,
  //   private transactionService: Transactionsservice,
  //   private accountService: Accountsservice
  // ) { }

  // ngOnInit(): void {
  //   this.formGroup = this.formBuilder.group({
  //     accountId: [''],
  //     accountName: [''],  //last update for show name in transaction table
  //     amount: [''],
  //     transactionDate: [new Date()],
  //     transactionId: [''],
  //     description: ['']
  //   })
  // }

  // withdraw(): void {
  //   const withdrawData: Withdraw = this.formGroup.value;
  //   const accountName = this.formGroup.value.accountName;  //last update for show name in transaction table

  //   this.accountService.withdrawFromAccount(withdrawData.accountId, withdrawData.amount,).subscribe({
  //     next: () => {

  //       this.withdrawService.saveWithdraw(withdrawData).subscribe({
  //         next: () => {

  //           // Transaction log  start
  //           const txn: Transaction = {
  //             id: '',
  //             accountId: withdrawData.accountId,
  //             accountName: accountName,   //last update for show name in transaction table
  //             type: 'Withdraw',
  //             amount: withdrawData.amount,
  //             transactiontime: new Date()
  //           };

  //           this.transactionService.logTransaction(txn).subscribe({
  //             next: () => {
  //               console.log('Transaction logged.');
  //               alert('Withdraw Successful and Transaction Logged');
  //               this.formGroup.reset();
  //             },
  //             error: () => {
  //               console.error('Transaction log failed.');
  //               alert('Withdraw success but transaction logging failed.');
  //             }
  //           });
  //           // Transaction log  end


  //           // alert('Withdraw Successful');
  //           // this.formGroup.reset();


  //         },
  //         error: (err) => {
  //           console.error('Withdraw save failed:', err);
  //           alert('Withdraw save failed!');
  //         }
  //       });
  //     },
  //     error: (err) => {
  //       console.error('Account withdraw failed:', err);
  //       alert(err.message || 'Withdraw failed from account');
  //     }
  //   });
  // }



}
