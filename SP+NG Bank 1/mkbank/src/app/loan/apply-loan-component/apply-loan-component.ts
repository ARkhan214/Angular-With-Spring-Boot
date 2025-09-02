import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AlertService } from '../../service/alert-service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-apply-loan-component',
  standalone: false,
  templateUrl: './apply-loan-component.html',
  styleUrl: './apply-loan-component.css'
})
export class ApplyLoanComponent  implements OnInit{

  
  loanForm!: FormGroup;
  token: string = '';

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private cdr: ChangeDetectorRef,
    private router: Router,
    private alertService: AlertService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  ngOnInit(): void {
    this.token = isPlatformBrowser(this.platformId) ? localStorage.getItem('authToken') || '' : '';

    this.loanForm = this.fb.group({
      loanAmount: [0, Validators.required],
      durationInMonths: [0, Validators.required],
      loanType: ['', Validators.required],
      // Auto-calculated / readonly fields
      emiAmount: [{ value: 0, disabled: true }],
      interestRate: [{ value: 0, disabled: true }],
      totalPayable: [{ value: 0, disabled: true }],
      status: [{ value: 'ACTIVE', disabled: true }],
      accountName: [{ value: '', disabled: true }],
      accountBalance: [{ value: 0, disabled: true }],
      accountNid: [{ value: '', disabled: true }],
      accountPhone: [{ value: '', disabled: true }],
      accountAddress: [{ value: '', disabled: true }],
      accountType: [{ value: '', disabled: true }]
    });

    // Auto-fill readonly fields based on user input before submit
    this.loanForm.valueChanges.subscribe(values => {
      if (values.loanAmount && values.durationInMonths && values.loanType) {
        const interestRate = this.getInterestRate(values.loanType);
        const totalInterest = values.loanAmount * (interestRate / 100);
        const totalPayable = values.loanAmount + totalInterest;
        const emi = totalPayable / values.durationInMonths;

        this.loanForm.patchValue({
          emiAmount: emi,
          interestRate: interestRate,
          totalPayable: totalPayable
        }, { emitEvent: false });
      }
    });
  }

  getInterestRate(type: string): number {
    switch(type) {
      case 'PERSONAL': return 10;
      case 'HOME': return 8;
      case 'CAR': return 9;
      case 'EDUCATION': return 5;
      case 'BUSINESS': return 7;
      default: return 7;
    }
  }

  applyLoan() {
    
    if (!this.loanForm.valid) {
      this.alertService.error('Please fill all required fields!');
      return;
    }

    const payload = {
      loanAmount: this.loanForm.value.loanAmount,
      durationInMonths: this.loanForm.value.durationInMonths,
      loanType: this.loanForm.value.loanType
    };

    if (!this.token) {
      this.alertService.error('Authentication token missing!');
      return;
    }

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.token}`
    });

    this.http.post('http://localhost:8085/api/loans/apply', payload, { headers })
      .subscribe({
        next: (res: any) => {
          // Patch all backend-returned fields to readonly fields
          this.loanForm.patchValue({
            emiAmount: res.emiAmount,
            interestRate: res.interestRate || 0,
            totalPayable: res.loanAmount + ((res.interestRate || 0)/100 * res.loanAmount),
            status: res.status
          }, { emitEvent: false });

          // ===== Patch Account Info =====
          if(res.account) {
            this.loanForm.patchValue({
              accountName: res.account.name,
              accountBalance: res.account.balance,
              accountNid: res.account.nid,
              accountPhone: res.account.phoneNumber,
              accountAddress: res.account.address,
              accountType: res.account.accountType
            }, { emitEvent: false });
          }

          this.alertService.success(`Loan applied successfully! Loan ID: ${res.id}`);
          this.cdr.markForCheck();
        },
        error: (err: any) => {
          console.error(err);
          this.alertService.error(err.error || 'Error applying loan');
        }
      });
  }
}
