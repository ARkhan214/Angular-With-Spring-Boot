import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { AlertService } from '../../service/alert-service';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-fixed-deposit-component',
  standalone: false,
  templateUrl: './fixed-deposit-component.html',
  styleUrl: './fixed-deposit-component.css'
})
export class FixedDepositComponent {

  depositAmount!: number;
  durationInMonths!: number;


  message: string = '';

  constructor(
    private http: HttpClient,
    private alertService: AlertService,
    private cdr: ChangeDetectorRef,
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  private getAuthToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken') || '';
    }
    return '';
  }

  fixedDeposit() {
    if (!this.depositAmount || !this.durationInMonths) {
      this.alertService.error('All fields are required!');
      return;
    }

    const payload = {
      depositAmount: this.depositAmount,
      durationInMonths: this.durationInMonths,

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

    this.http.post('http://localhost:8085/api/fd/create', payload, { headers })
      .subscribe({
        next: (res: any) => {
          this.message = `FD Successfully! Loan ID: ${res.id}`;
          this.alertService.success(this.message);
          this.cdr.markForCheck();
          // চাইলে redirect দিতে পারো:
          // this.router.navigate(['/view-all-loan']);
        },
        error: (err: any) => {
          console.error(err);
          this.message = err.error || 'Error applying for FD';
          this.alertService.error(this.message);
        }
      });
  }

}
