import { Component } from '@angular/core';
import { LoanService } from '../../service/loan-service';
import { AlertService } from '../../service/alert-service';
import { LoanPayService } from '../../service/loan-pay-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pay-loan',
  standalone: false,
  templateUrl: './pay-loan.html',
  styleUrl: './pay-loan.css'
})
export class PayLoan {


  loanId: number | null = null;
  amount: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private loanPayService: LoanPayService,
    private alertService:AlertService,
    private router:Router 

  ) {}

  payLoan(): void {
    if (!this.loanId || !this.amount || this.amount <= 0) {
      this.errorMessage = 'Please enter valid Loan ID and Amount';
      this.successMessage = '';
      return;
    }

    this.loading = true;
    this.loanPayService.payLoan(this.loanId, this.amount).subscribe({
      next: (res) => {
        // this.successMessage = `Payment successful! Remaining Amount: ${res.remainingAmount}`;
        this.alertService.success('Payment successful! Remaining Amount:' +this.amount)
        this.errorMessage = '';
         this.router.navigate(['/view-all-loan']);
        this.loading = false;
      },
      error: (err) => {
        // this.errorMessage = err.error || 'Payment failed. Try again.';
        this.alertService.error('')
        this.successMessage = '';
        console.error('Loan pay error:', err);
        this.loading = false;
      }
    });
  }

}
