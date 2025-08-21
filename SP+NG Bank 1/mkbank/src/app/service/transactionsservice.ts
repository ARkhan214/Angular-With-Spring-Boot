import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Transaction } from '../model/transactions.model';
import { forkJoin, map, Observable, switchMap, throwError } from 'rxjs';
import { Accountsservice } from './accountsservice';
import { Accounts } from '../model/accounts.model';
import { environment } from '../environment/environment';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class Transactionsservice {


  private apiUrl = environment.springUrl + "/account";
  // private transactionsUrl = environment.springUrl + "transactions/account";
  private baseUrl = 'http://localhost:8085/api/transactions';

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // Deposit / Withdraw / InitialBalance
  makeTransaction(transaction: Transaction, accountId: number, token: string): Observable<Transaction> {
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<Transaction>(
      `${this.baseUrl}/tr/${accountId}`,
      transaction,
      { headers }
    );
  }


  // Get transactions by accountId
  getTransactionsByAccount(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/account/${accountId}`);
  }

  private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken') || '';
    }
    return '';
  }

  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
  }
  transferOnly(transaction: Transaction, senderId: number, receiverId: number, token: string): Observable<Transaction> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  });

  return this.http.post<Transaction>(
    `${this.baseUrl}/tr/${senderId}/${receiverId}`,
    transaction,
    { headers }
  );
}


  // makeTransaction(transaction: Transaction, accountId: number, token: string): Observable<Transaction> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.post<Transaction>(`${this.baseUrl}/${accountId}`, transaction, { headers });
  // }


  // addTransactionWithBalance(transaction: Transaction): Observable<any> {
  //   const accountId = transaction.accountId;

  //   console.log(accountId);

  //   return this.http.get<Accounts>(`${this.apiUrl}/${accountId}`).pipe(

  //     switchMap(account => {
  //       if (!account) {
  //         return throwError(() => new Error('Account not found!'));
  //       }

  //       //new code for status
  //       if (account.accountActiveStatus === false) {
  //         return throwError(() => new Error('This account is closed and cannot perform transactions.'));
  //       }

  //       let newBalance = account.balance || 0;

  //       console.log(accountId);

  //       if (transaction.type === 'DEPOSIT') {
  //         newBalance += transaction.amount;
  //       } else if (transaction.type === 'WITHDRAW') {
  //         if (transaction.amount > newBalance) {
  //           return throwError(() => new Error('Insufficient balance!'));
  //         }
  //         newBalance -= transaction.amount;
  //       }

  //       else if (transaction.type === 'TRANSFER') {
  //         if (transaction.amount > newBalance) {
  //           return throwError(() => new Error('Insufficient balance!'));
  //         }

  //         // Sender balance minus
  //         newBalance -= transaction.amount;

  //         // Find Receiver account and incarage balance
  //         const receiverId = transaction.receiverAccountId;

  //         this.http.get<Accounts>(`${this.apiUrl}/${receiverId}`).subscribe(receiverAccount => {

  //           const updatedReceiver = {
  //             ...receiverAccount,
  //             balance: receiverAccount.balance + transaction.amount
  //           };

  //           // update Receiver- balance
  //           this.http.put(`${this.apiUrl}/${receiverId}`, updatedReceiver).subscribe({
  //             next: () => {
  //               console.log('Receiver balance updated!');
  //             },
  //             error: err => {
  //               console.error('Receiver update failed:', err);
  //             }
  //           });
  //         }, error => {
  //           console.error('Receiver not found:', error);
  //         });
  //       }

  //       // Update account balance
  //       const updatedAccount: Accounts = { ...account, balance: newBalance };

  //       return this.http.put<Accounts>(`${this.apiUrl}/${accountId}`, updatedAccount).pipe(
  //         switchMap(() => {
  //           return this.http.post<Transaction>(this.transactionsUrl, transaction);
  //         })
  //       );
  //     })
  //   );

  // }





  // addTransaction(transaction: Transaction): Observable<any> {

  //   const accountId = transaction.accountId;

  //   return this.http.get<Accounts>(`${this.apiUrl}/${accountId}`).pipe(
  //     switchMap(account => {
  //       if (!account) {
  //         return throwError(() => new Error('Account not found!'));
  //       }

  //       let newBalance = account.balance || 0;

  //       if (transaction.type === 'DEPOSIT') {
  //         newBalance += transaction.amount;
  //       } else if (transaction.type === 'WITHDRAW') {
  //         if (transaction.amount > newBalance) {
  //           return throwError(() => new Error('Insufficient balance!'));
  //         }
  //         newBalance -= transaction.amount;
  //       }
  //        const updatedAccount: Accounts = { ...account, balance: newBalance };

  //              return this.http.put<Accounts>(`${this.apiUrl}/${accountId}`, updatedAccount).pipe(
  //         switchMap(() => {
  //           return this.http.post<Transaction>(this.transactionsUrl, transaction);
  //         })
  //       );
  //     })

  //   );
  // }


  getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
    // JSON server supports ?accountId=XYZ
    const params = new HttpParams().set('accountId', accountId);
    return this.http.get<Transaction[]>('http://localhost:8085/api/transactions/', { params });
  }

  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('http://localhost:8085/api/transactions/').pipe(
      map(data => data.filter(t => t.amount > 0)) // only positive amount
    );
  }
  getPositiveTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/positive`).pipe(
      map(data => data.filter(t => t.amount > 0))
    );
  }

//For Admin dashbord
//   getPositiveTransactions(): Observable<Transaction[]> {
//   return this.http.get<Transaction[]>(`${this.apiUrl}/transactions/positive`);
// }



  getWithdrawTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('http://localhost:8085/api/transactions/').pipe(
      map(data => data.filter(t => t.type === 'WITHDRAW' || t.type === 'TRANSFER'))
    );
  }




}
