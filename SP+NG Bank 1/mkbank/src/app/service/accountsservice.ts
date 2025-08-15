import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Accounts } from '../model/accounts.model';
import { map, Observable, switchMap, throwError } from 'rxjs';
import { environment } from '../environment/environment';

@Injectable({
  providedIn: 'root'
})
export class Accountsservice {


  private apiUrl = environment.springUrl+"account";

  constructor(
    private http: HttpClient
  ) { }

// new method for close part
  depositToAccount(id: number, amount: number): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Accounts>(url).pipe(
    switchMap(account => {
      if (account.accountActiveStatus === false) {
        return throwError(() => new Error('This account is closed and cannot accept deposits.'));
      }
      account.balance += amount;
      return this.http.put<Accounts>(url, account);
    })
  );
}
  


// new method for close part

  withdrawFromAccount(id: number, amount: number): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Accounts>(url).pipe(
    switchMap(account => {
      if (account.accountActiveStatus === false) {
        return throwError(() => new Error('This account is closed and cannot withdraw money.'));
      }
      if (account.balance < amount) {
        return throwError(() => new Error('Insufficient balance'));
      }
      account.balance -= amount;
      return this.http.put<Accounts>(url, account);
    })
  );
}



// new method for close part
  closeAccount(id: number): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Accounts>(url).pipe(
    switchMap(account => {
      account.accountActiveStatus = false;
      return this.http.put(url, account);
    })
  );
}

//  Reactivate or Open account
openAccount(id: number): Observable<any> {
  const url = `${this.apiUrl}/${id}`;
  return this.http.get<Accounts>(url).pipe(
    switchMap(account => {
      account.accountActiveStatus = true;  //  status change
      return this.http.put(url, account);
    })
  );
}


  addAccount(account: Accounts): Observable<Accounts> {
    return this.http.post<Accounts>(this.apiUrl, account);
  }

  getAccountsByUserId(userId: number): Observable<Accounts[]> {
    return this.http.get<Accounts[]>(`${this.apiUrl}?userId=${userId}`);
  }

findAccountByUserId(userId: number): Observable<Accounts | null> {
  return this.getAccountsByUserId(userId).pipe(
    map(accounts => accounts.length > 0 ? accounts[0] : null)
  );
}


  //last update Accounts[]

  getAllAccount(): Observable<Accounts[]> {
    return this.http.get<Accounts[]>(this.apiUrl+"/all");
  }


  // view account info
  getAllAccountById(id:number): Observable<Accounts> {
    return this.http.get<Accounts>(this.apiUrl+"/"+id);
  }


  updateAccount(id: number, account: Accounts): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, account);
  }

  deleteAccount(id: number): Observable<any> {
    return this.http.delete(this.apiUrl + '/' + id);
  }



  //for admin dashbord
getAllAccounts() {
  return this.http.get<Accounts[]>(this.apiUrl);
}


registerAccount(formData: FormData): Observable<any> {
  return this.http.post(this.apiUrl, formData);
}


}
