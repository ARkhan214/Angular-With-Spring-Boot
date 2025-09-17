import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { LoanService } from '../../service/loan-service';
import { AlertService } from '../../service/alert-service';

@Component({
  selector: 'app-admin-loan-approve-component',
  standalone: false,
  templateUrl: './admin-loan-approve-component.html',
  styleUrl: './admin-loan-approve-component.css'
})
export class AdminLoanApproveComponent implements OnInit {
loans: any[] = [];

massage!: '';

  constructor(
    
    private loanService: LoanService,
    private alertService:AlertService,
    private cdr:ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadPendingLoans();
  }

  loadPendingLoans() {
    this.loanService.getAll().subscribe({
      next: (data) => {
         this.loans = data.filter((loan: any) => loan.status === 'PENDING');
         this.cdr.markForCheck();
        console.log(data,"fgjytjkyu");
      },
      error: (err) => console.error('Error fetching loans', err)
    });
  }

  approveLoan(loanId: number) {
    this.loanService.approveLoan(loanId).subscribe({
      next: (res) => {        
        // alert('Loan Approved Successfully');
         this.cdr.markForCheck();
        this.loadPendingLoans(); 
       
        // this.alertService.success('Loan Approved Successfully');
        // refresh pending loans
      },
      error: (err) => console.error('Error approving loan', err)
    });
  }

  rejectLoan(loanId: number) {
    this.loanService.rejectLoan(loanId).subscribe({
      next: () => {
             this.alertService.success('Loan not Approved ');
        // alert('Loan Rejected Successfully');
        this.loadPendingLoans(); // refresh pending loans
      },
      error: (err) => console.error('Error rejecting loan', err)
    });
  }

}
