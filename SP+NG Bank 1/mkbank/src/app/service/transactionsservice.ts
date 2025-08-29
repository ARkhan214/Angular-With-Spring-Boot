import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { Transaction } from '../model/transactions.model';
import { forkJoin, map, Observable, switchMap, throwError } from 'rxjs';
import { Accountsservice } from './accountsservice';
import { Accounts } from '../model/accounts.model';
import { environment } from '../environment/environment';
import { isPlatformBrowser } from '@angular/common';
import { TransactionDTO } from '../model/transactionStatementDTO.model';

@Injectable({
  providedIn: 'root'
})
export class Transactionsservice {

 private baseUrl = environment.springUrl + '/transactions';  // backend API base

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // ======================================
  // Deposit / Withdraw / InitialBalance
  // ======================================
makeTransaction(transaction: Transaction): Observable<Transaction> {
  const headers = this.getAuthHeaders();

  if (isPlatformBrowser(this.platformId)) {
    // accountId backend automatically token theke nibe, so path e id lagbe na
    return this.http.post<Transaction>(
      `${this.baseUrl}/add`,
      transaction,
      { headers }
    );
  }

  // If not browser (SSR), return a safe fallback
  return throwError(() => new Error('localStorage not available in this environment'));
}


  // Deposit / Withdraw / InitialBalance
  // makeTransaction(transaction: Transaction, accountId: number, token: string): Observable<Transaction> {
  //   const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  //   return this.http.post<Transaction>(
  //     `${this.baseUrl}/tr/${accountId}`,
  //     transaction,
  //     { headers }
  //   );
  // }




  //Authorization Header Meaking from JWT Token(eta jodio age silo :Last update)
  private getToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken') || '';
    }
    return '';
  }

  // ======================================
  private getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  // private getAuthHeaders(): HttpHeaders {
  //   const token = this.getToken();
  //   return new HttpHeaders({
  //     'Authorization': `Bearer ${token}`
  //   });
  // }


  // Transfer (Last update)
  // ======================================
transfer(transaction: Transaction, receiverId: number): Observable<Transaction> {
  if (isPlatformBrowser(this.platformId)) {
    const headers = this.getAuthHeaders();
    return this.http.post<Transaction>(
      `${this.baseUrl}/tr/transfer/${receiverId}`,
      transaction,
      { headers }
    );
  }

  return throwError(() => new Error('Transfer not available in this environment (SSR)'));
}



  // Account Transaction list(last update)
  // ======================================
  // getTransactionsByAccount(accountId: number): Observable<Transaction[]> {
  //   const headers = this.getAuthHeaders();
  //   return this.http.get<Transaction[]>(
  //     `${this.baseUrl}/account/${accountId}`,
  //     { headers }
  //   );
  // }

    // Get transactions by accountId
  // getTransactionsByAccount(accountId: number): Observable<Transaction[]> {
  //   return this.http.get<Transaction[]>(`${this.baseUrl}/account/${accountId}`);
  // }


  //its working 
  getTransactionsByAccountId(accountId: number): Observable<Transaction[]> {
    // JSON server supports ?accountId=XYZ
    const params = new HttpParams().set('accountId', accountId);
    return this.http.get<Transaction[]>( `${this.baseUrl}/account/${accountId}`, { params });
  }

  //demmo
  getTransactionsByAccountIdAndDateRange(accountId: number, start: string, end: string): Observable<Transaction[]> {
  return this.http.get<Transaction[]>(
    `${this.baseUrl}/account/${accountId}/filter?startDate=${start}&endDate=${end}`
  );
}

  // ======================================
  // All Transaction (Admin Dashboard )
  // ======================================
  getAllTransactions(): Observable<Transaction[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Transaction[]>(`${this.baseUrl}`, { headers });
  }

  // ======================================
  // Withdraw & Transfer only(for admin Dashbord it's working)
  // ======================================
  getWithdrawTransactions(): Observable<Transaction[]> {
    const headers = this.getAuthHeaders();
    return this.http.get<Transaction[]>(`${this.baseUrl}`, { headers });
  }

  // getAllTransactions(): Observable<Transaction[]> {
  //   return this.http.get<Transaction[]>('http://localhost:8085/api/transactions/').pipe(
  //     map(data => data.filter(t => t.amount > 0)) // only positive amount
  //   );
  // }


  // getWithdrawTransactions(): Observable<Transaction[]> {
  //   return this.http.get<Transaction[]>('http://localhost:8085/api/transactions/').pipe(
  //     map(data => data.filter(t => t.type === 'WITHDRAW' || t.type === 'TRANSFER'))
  //   );
  // }


  getPositiveTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.baseUrl}/positive`).pipe(
      map(data => data.filter(t => t.amount > 0))
    );
  }

  //For Admin dashbord
  //   getPositiveTransactions(): Observable<Transaction[]> {
  //   return this.http.get<Transaction[]>(`${this.baseUrl}/transactions/positive`);
  // }




//-----Find All Transaction for Transaction Statement for Account--------Start------
  getStatement(): Observable<TransactionDTO[]> {
    
    let headers = new HttpHeaders();

    if (isPlatformBrowser(this.platformId)) {
      const token = localStorage.getItem('authToken');
     
      if (token) {
        headers = headers.set('Authorization', 'Bearer ' + token);
      }
    }

    return this.http.get<TransactionDTO[]>(`${environment.springUrl}/transactions/statement`, { headers });
  }
//-----Find All Transaction for Transaction Statement for Account--------End------


//-----Find All Transaction for Transaction Statement for Employee--------Start------

    getTransactionsByAccount(accountId: number): Observable<TransactionDTO[]> {
   
    return this.http.get<TransactionDTO[]>(`${environment.springUrl}/employees/${accountId}`);
  }

//-----Find All Transaction for Transaction Statement for Employee--------End------


// -------- Filter Section -----------For Traansaction Statement Filter Start for Employee-----------------------
getTransactionsWithFilter(
  accountId: number,
  startDate?: string,
  endDate?: string,
  type?: string,
  transactionType?: string
): Observable<TransactionDTO[]> {
  let params = new HttpParams().set('accountId', accountId);

  if (startDate) params = params.set('startDate', startDate);
  if (endDate) params = params.set('endDate', endDate);
  if (type) params = params.set('type', type);
  if (transactionType) params = params.set('transactionType', transactionType);

  return this.http.get<TransactionDTO[]>(`${this.baseUrl}/filter`, { params });
}
// -------- Filter Section -----------For Traansaction Statement Filter End for Employee-----------------------


// -------- Filter Section -----------For Traansaction Statement Filter Start for Account-----------------------
getTransactionsWithFilterForAccountHolder(
  startDate?: string,
  endDate?: string,
  type?: string,
  transactionType?: string
): Observable<TransactionDTO[]> {
  let params = new HttpParams();

  if (startDate) params = params.set('startDate', startDate);
  if (endDate) params = params.set('endDate', endDate);
  if (type) params = params.set('type', type);
  if (transactionType) params = params.set('transactionType', transactionType);

  const headers = this.getAuthHeaders();

  return this.http.get<TransactionDTO[]>(`${environment.springUrl}/transactions/statement/filter`, { params, headers });
}

// -------- Filter Section -----------For Traansaction Statement Filter End for Account-----------------------



}
