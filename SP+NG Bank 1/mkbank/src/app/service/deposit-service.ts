import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Deposit } from '../model/deposit.model';

@Injectable({
  providedIn: 'root'
})
export class DepositService {
private baseUrl: string="http://localhost:3000/deposit"


  constructor(private http: HttpClient) { }

 
  saveDeposit(deposit: Deposit): Observable<any>{
   return this.http.post(this.baseUrl, deposit);
  }

  //  Read All (GET)
  getAllDeposits(): Observable<Deposit[]> {
    return this.http.get<Deposit[]>(this.baseUrl);
  }

  //  Read by ID (GET)
  getDepositById(id: string): Observable<Deposit> {
    return this.http.get<Deposit>(`${this.baseUrl}/${id}`);
  }
  
  updateDeposit(id: string, deposit: Deposit): Observable<Deposit> {
    return this.http.put<Deposit>(`${this.baseUrl}/${id}`, deposit);
  }


  deleteDeposit(id: string): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }
}
