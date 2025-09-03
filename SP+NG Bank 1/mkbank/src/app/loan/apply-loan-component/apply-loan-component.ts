import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AlertService } from '../../service/alert-service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';


@Component({
  selector: 'app-apply-loan-component',
  standalone: false,
  templateUrl: './apply-loan-component.html',
  styleUrl: './apply-loan-component.css'
})
export class ApplyLoanComponent implements OnInit{


// User input
  loanAmount!: number;
  durationInMonths!: number;
  loanType: string = '';

  // Pre-filled data
  accountId!: number;
  accountName: string = '';
  balance!: number;
  accountType: string = '';
  nid: string = '';
  phoneNumber: string = '';
  address: string = '';

    // Calculated fields
  emiAmount: number = 0;
  totalPayable: number = 0;
  interestRate: number = 0;

  message: string = '';


    // Loan type interest rates
  private interestRates: { [key: string]: number } = {
    PERSONAL: 12,
    HOME: 8,
    CAR: 9,
    EDUCATION: 6,
    BUSINESS: 14
  };


  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.loadInitData();
  }

  
     // EMI calculation function
  calculateEmi(): void {
    if (!this.loanAmount || !this.durationInMonths || !this.loanType) {
      this.emiAmount = 0;
      this.totalPayable = 0;
      this.interestRate = 0;
      return;
    }

    this.interestRate = this.interestRates[this.loanType] || 10;
    const totalInterest = this.loanAmount * (this.interestRate / 100);
    this.totalPayable = this.loanAmount + totalInterest;
    this.emiAmount = this.totalPayable / this.durationInMonths;
  }

  private getAuthToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken') || '';
    }
    return '';
  }

  loadInitData() {
    const token = this.getAuthToken();
    if (!token) {
      this.alertService.error('Authentication token not found. Please login again.');
      return;
    }

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.get<any>('http://localhost:8085/api/loans/apply/init', { headers })
      .subscribe({
        next: (res) => {
          // Pre-fill account & loan info
          this.accountId = res.account.id;
          this.accountName = res.account.name;
          this.balance = res.account.balance;
          this.accountType = res.account.accountType;
          this.nid = res.account.nid;
          this.phoneNumber = res.account.phoneNumber;
          this.address = res.account.address;

          // Optional: default values
          this.loanAmount = 0;
          this.durationInMonths = 0;
          this.loanType = '';
        },
        error: (err) => {
          console.error(err);
          this.alertService.error('Failed to load initial loan data');
        }
      });
  }

  applyLoan() {
    if (!this.loanAmount || !this.durationInMonths || !this.loanType) {
      this.alertService.error('All fields are required!');
      return;
    }

    const payload = {
      loanAmount: this.loanAmount,
      durationInMonths: this.durationInMonths,
      loanType: this.loanType
    };

    const token = this.getAuthToken();
    if (!token) {
      this.alertService.error('Authentication token not found. Please login again.');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    this.http.post('http://localhost:8085/api/loans/apply', payload, { headers })
      .subscribe({
        next: (res: any) => {
          this.message = `Loan Applied Successfully! Loan ID: ${res.id}`;
          this.alertService.success(this.message);
          this.cdr.markForCheck();
          this.router.navigate(['/view-all-loan']);
        },
        error: (err: any) => {
          console.error(err);
          this.message = err.error || 'Error applying for loan';
          this.alertService.error(this.message);
        }
      });
  }




//---------------------------------------------------

  // loanAmount!: number;
  // durationInMonths!: number;
  // loanType: string = '';

  // message: string = '';

  // constructor(
  //   private http: HttpClient,
  //   private alertService: AlertService,
  //   private cdr: ChangeDetectorRef,
  //   private router: Router,
  //   @Inject(PLATFORM_ID) private platformId: Object
  // ) { }

  // private getAuthToken(): string {
  //   if (isPlatformBrowser(this.platformId)) {
  //     return localStorage.getItem('authToken') || '';
  //   }
  //   return '';
  // }

  // applyLoan() {
  //   if (!this.loanAmount || !this.durationInMonths || !this.loanType) {
  //     this.alertService.error('All fields are required!');
  //     return;
  //   }

  //   const payload = {
  //     loanAmount: this.loanAmount,
  //     durationInMonths: this.durationInMonths,
  //     loanType: this.loanType
  //   };

  //   const token = this.getAuthToken();

  //   if (!token) {
  //     this.alertService.error('Authentication token not found. Please login again.');
  //     return;
  //   }

  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });

  //   this.http.post('http://localhost:8085/api/loans/apply', payload, { headers })
  //     .subscribe({
  //       next: (res: any) => {
  //         this.message = `Loan Applied Successfully! Loan ID: ${res.id}`;
  //         this.alertService.success(this.message);
  //         this.cdr.markForCheck();
  //         // চাইলে redirect দিতে পারো:
  //         this.router.navigate(['/view-all-loan']);
  //       },
  //       error: (err: any) => {
  //         console.error(err);
  //         this.message = err.error || 'Error applying for loan';
  //         this.alertService.error(this.message);
  //       }
  //     });
  // }
}