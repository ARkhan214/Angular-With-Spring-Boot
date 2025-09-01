import { Component, OnInit } from '@angular/core';
import { LoanService } from '../../service/loan-service';

@Component({
  selector: 'app-admin-loan-approve-component',
  standalone: false,
  templateUrl: './admin-loan-approve-component.html',
  styleUrl: './admin-loan-approve-component.css'
})
export class AdminLoanApproveComponent implements OnInit {
loans: any[] = [];

  constructor(private loanService: LoanService) {}

  ngOnInit(): void {
    this.loadPendingLoans();
  }

  loadPendingLoans() {
    this.loanService.getPendingLoans().subscribe({
      next: (data) => this.loans = data,
      error: (err) => console.error('Error fetching loans', err)
    });
  }

  approveLoan(loanId: number) {
    this.loanService.approveLoan(loanId).subscribe({
      next: () => {
        alert('Loan Approved Successfully');
        this.loadPendingLoans(); // refresh pending loans
      },
      error: (err) => console.error('Error approving loan', err)
    });
  }

  rejectLoan(loanId: number) {
    this.loanService.rejectLoan(loanId).subscribe({
      next: () => {
        alert('Loan Rejected Successfully');
        this.loadPendingLoans(); // refresh pending loans
      },
      error: (err) => console.error('Error rejecting loan', err)
    });
  }

}
