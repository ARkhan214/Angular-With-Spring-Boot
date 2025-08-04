import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Transaction } from '../model/transactions.model';
import { forkJoin, map, Observable, switchMap, throwError } from 'rxjs';
import { Accountsservice } from './accountsservice';
import { Accounts } from '../model/accounts.model';

@Injectable({
  providedIn: 'root'
})
export class Transactionsservice {


  private accountsUrl = 'http://localhost:3000/accounts'; // JSON server URL
  private transactionsUrl = 'http://localhost:3000/transactions';

  constructor(private http: HttpClient) { }

  addTransactionWithBalance(transaction: Transaction): Observable<any> {
    const accountId = transaction.accountId;

    return this.http.get<Accounts>(`${this.accountsUrl}/${accountId}`).pipe(
      switchMap(account => {
        if (!account) {
          return throwError(() => new Error('Account not found!'));
        }

         //new code for status
      if (account.status === 'Closed') {
        return throwError(() => new Error('This account is closed and cannot perform transactions.'));
      }

        let newBalance = account.balance || 0;

        if (transaction.type === 'Deposit') {
          newBalance += transaction.amount;
        } else if (transaction.type === 'Withdraw') {
          if (transaction.amount > newBalance) {
            return throwError(() => new Error('Insufficient balance!'));
          }
          newBalance -= transaction.amount;
        }

        else if (transaction.type === 'Transfer') {
          if (transaction.amount > newBalance) {
            return throwError(() => new Error('Insufficient balance!'));
          }

          // Sender balance minus
          newBalance -= transaction.amount;

          // Find Receiver account and incarage balance
          const receiverId = transaction.receiverAccountId;

          this.http.get<Accounts>(`${this.accountsUrl}/${receiverId}`).subscribe(receiverAccount => {
            
            const updatedReceiver = {
              ...receiverAccount,
              balance: receiverAccount.balance + transaction.amount
            };

            // update Receiver- balance
            this.http.put(`${this.accountsUrl}/${receiverId}`, updatedReceiver).subscribe({
              next: () => {
                console.log('Receiver balance updated!');
              },
              error: err => {
                console.error('Receiver update failed:', err);
              }
            });
          }, error => {
            console.error('Receiver not found:', error);
          });
        }
       
        // Update account balance
        const updatedAccount: Accounts = { ...account, balance: newBalance };

        return this.http.put<Accounts>(`${this.accountsUrl}/${accountId}`, updatedAccount).pipe(
          switchMap(() => {
            return this.http.post<Transaction>(this.transactionsUrl, transaction);
          })
        );
     })
    );

  }




  getTransactionsByAccountId(accountId: string): Observable<Transaction[]> {
    // JSON server supports ?accountId=XYZ
    const params = new HttpParams().set('accountId', accountId);
    return this.http.get<Transaction[]>(this.transactionsUrl, { params });
  }


  //for all transaction
//   getAllTransactions(): Observable<Transaction[]> {
//   return this.http.get<Transaction[]>('http://localhost:3000/transactions');
// }

getAllTransactions(): Observable<Transaction[]> {
  return this.http.get<Transaction[]>('http://localhost:3000/transactions').pipe(
    map(data => data.filter(t => t.amount > 0)) // শুধু positive amount
  );
}
getPositiveTransactions(): Observable<Transaction[]> {
  return this.http.get<Transaction[]>('http://localhost:3000/transactions').pipe(
    map(data => data.filter(t => t.amount > 0))
  );
}


getWithdrawTransactions(): Observable<Transaction[]> {
  return this.http.get<Transaction[]>('http://localhost:3000/transactions').pipe(
    map(data => data.filter(t => t.type === 'Withdraw' || t.type === 'Transfer'))
  );
}




}
