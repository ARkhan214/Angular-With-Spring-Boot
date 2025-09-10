import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AlertService } from '../../service/alert-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-dps-pay-component',
  standalone: false,
  templateUrl: './dps-pay-component.html',
  styleUrl: './dps-pay-component.css'
})
export class DpsPayComponent {

  dpsId: number | null = null;
  successMessage: string = '';
  errorMessage: string = '';
  loading: boolean = false;

  constructor(
    private alertService: AlertService,
    private router: Router,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) { }

  // ✅ Token Getter
  private getAuthToken(): string {
    if (isPlatformBrowser(this.platformId)) {
      return localStorage.getItem('authToken') || '';
    }
    return '';
  }

  // ✅ Pay DPS Monthly
  payDps(): void {
    if (!this.dpsId) {
      this.errorMessage = 'Please enter valid DPS ID';
      this.successMessage = '';
      return;
    }

    const token = this.getAuthToken();
    if (!token) {
      this.alertService.error('Authentication token not found. Please login again.');
      return;
    }

    this.loading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    this.http.post(`http://localhost:8085/api/dps/pay/${this.dpsId}`, {}, { 
      headers,
      responseType:'text'
     })
      .subscribe({
        next: (res: any) => {
          this.successMessage = res.successMessage || 'Monthly DPS payment successful!';
          this.alertService.success(this.successMessage);
          this.resetForm();
          this.loading = false;
        },
        error: (err: any) => {
          console.error(err);
          this.errorMessage = err.error || 'Payment failed';
          this.alertService.error(this.errorMessage);
          this.loading = false;
        }
      });
  }

  // ✅ Reset Method
resetForm(): void {
  this.dpsId = null;
  this.successMessage = '';
  this.errorMessage = '';
  this.loading = false;
}

}
