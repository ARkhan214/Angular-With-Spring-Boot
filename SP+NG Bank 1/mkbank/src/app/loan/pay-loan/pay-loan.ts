import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { LoanService } from '../../service/loan-service';
import { AlertService } from '../../service/alert-service';
import { LoanPayService } from '../../service/loan-pay-service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-pay-loan',
  standalone: false,
  templateUrl: './pay-loan.html',
  styleUrl: './pay-loan.css'
})
export class PayLoan {
 loanId: number | null = null;
  amount: number | null = null;
  loanData: any = null;
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private loanPayService: LoanPayService,
    private alertService: AlertService,
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const savedLoanId = localStorage.getItem('loanId');
      if (savedLoanId) {
        this.loanId = Number(savedLoanId);
        this.fetchLoanDetails(); // auto-fetch saved loan
      }
    }
  }

  private getAuthToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken') || '';
    }
    return '';
  }

 // Fetch loan details
 fetchLoanDetails(): void {
  if (!this.loanId) {
    this.errorMessage = 'Please enter Loan ID';
    this.loanData = null;
    return;
  }

  const token = this.getAuthToken();
  if (!token) {
    this.alertService.error('Authentication token not found. Please login again.');
    return;
  }

  const headers = new HttpHeaders({ 'Authorization': `Bearer ${token}` });

  this.http.get(`http://localhost:8085/api/loans/${this.loanId}`, {headers})
    .subscribe({
      next: (res: any) => {
        this.loanData = res;
        this.errorMessage = '';
        this.cdr.markForCheck();
      },
      error: (err: any) => {
        console.error(err);
        this.errorMessage = err.error || 'Loan not found';
        this.loanData = null;
      }
    });
}


  //  loan payment
  payLoan(): void {
    if (!this.loanId || !this.amount) {
       this.alertService.error('Please enter amount');
      return;
    }

    this.loading = true;
    this.loanPayService.payLoan(this.loanId, this.amount).subscribe({
  next: (res) => {
    this.alertService.success('Payment successful! '+this.amount);
    this.errorMessage = '';
    this.loading = false;
    this.fetchLoanDetails(); // refresh loan info
  },
  error: (err) => {
    this.alertService.error(err.error || 'Payment failed');
    this.successMessage = '';
    this.loading = false;
  }
});
  }

}
