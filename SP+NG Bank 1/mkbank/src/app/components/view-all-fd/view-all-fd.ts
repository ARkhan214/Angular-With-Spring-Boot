import { ChangeDetectorRef, Component } from '@angular/core';
import { FixedDeposit } from '../../model/fixedDeposit.model';
import { FixedDepositService } from '../../service/fixed-deposit-service';

@Component({
  selector: 'app-view-all-fd',
  standalone: false,
  templateUrl: './view-all-fd.html',
  styleUrl: './view-all-fd.css'
})
export class ViewAllFd {

  fds: FixedDeposit[] = [];
  errorMessage: string = '';
  loading: boolean = true;

  constructor(private fdService: FixedDepositService,
    private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadFDs();
  }

  loadFDs(): void {
    this.fdService.getMyFDs().subscribe({
      next: (data) => {
        this.fds = data;
        this.cdr.markForCheck();
        this.loading = false;
      },
      error: (err) => {
        if (err.status === 403) {
          this.errorMessage = 'Unauthorized! Please login again.';
        } else {
          this.errorMessage = 'Failed to load Fixed Deposits';
        }
        console.error('FD load error:', err);
        this.loading = false;
      }
    });
  }

}
