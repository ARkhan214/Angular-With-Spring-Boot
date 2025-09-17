import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TransactionDTO } from '../../model/transactionStatementDTO.model';
import { Transactionsservice } from '../../service/transactionsservice';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-emp-tran-statement',
  standalone: false,
  templateUrl: './emp-tran-statement.html',
  styleUrl: './emp-tran-statement.css'
})
export class EmpTranStatement implements OnInit {

  @ViewChild('transactionTable') transactionTable!: ElementRef; // Get table reference

  transactions: TransactionDTO[] = [];
  loading: boolean = false;
  errorMessage: string = '';
  accountId: number = 0; // employee will enter this manually


  totalWithdraw: number = 0;
  totalDeposit: number = 0;
  totalBalance: number = 0;

  //For Traansaction Statement Filter Start-------------------
  startDate: string = '';
  endDate: string = '';
  type: string = '';
  transactionType: string = '';
  //For Traansaction Statement Filter End----------------------

  constructor(
    private transactionService: Transactionsservice,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void { }

  loadTransactions() {
    if (!this.accountId) {
      this.errorMessage = 'Please enter a valid account ID';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.transactionService.getTransactionsByAccount(this.accountId).subscribe({
      next: (data) => {
        this.transactions = data;
          this.computeTotals();
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load transactions', err);
        this.errorMessage = 'Failed to load transactions';
        this.transactions = [];
        this.loading = false;
      }
    });
  }

computeTotals() {
  this.totalWithdraw = 0;
  this.totalDeposit = 0;
  this.totalBalance = 0;

  let runningBalance = 0;

  for (let tx of this.transactions) {
    if (tx.type === 'DEBIT') {
      this.totalWithdraw += tx.amount!;
      runningBalance -= tx.amount!;
    } else if (tx.type === 'CREDIT') {
      this.totalDeposit += tx.amount!;
      runningBalance += tx.amount!;
    }

    // প্রতিটি ট্রানজেকশনের জন্য running balance সেট
    tx.runningBalance = runningBalance;
  }

  this.totalBalance = runningBalance;
}


// computeTotals() {
//     this.totalWithdraw = 0;
//     this.totalDeposit = 0;
//     this.totalBalance = 0;

//     for (let tx of this.transactions) {
//       if (tx.type === 'DEBIT') {
//         this.totalWithdraw += tx.amount!;
//       } else if (tx.type === 'CREDIT') {
//         this.totalDeposit += tx.amount!;
//       }

//       this.totalBalance = tx.account.balance ?? tx.account.balance; // last balance
//     }

//     console.log(this.totalWithdraw + "1111111111111111111111111");
//     console.log(this.totalDeposit + "22222222222222222222222222");
//     console.log(this.totalBalance + "333333333333333333333333333");

//   }


  //For Traansaction Statement Filter Start---------------------
  applyFilter() {
    if (!this.accountId) {
      this.errorMessage = 'Please enter a valid account ID';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.transactionService.getTransactionsWithFilter(
      this.accountId,
      this.startDate,
      this.endDate,
      this.type,
      this.transactionType
    ).subscribe({
      next: (data) => {
        this.transactions = data;
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load filtered transactions', err);
        this.errorMessage = 'Failed to load filtered transactions';
        this.transactions = [];
        this.loading = false;
      }
    });
  }
  //For Traansaction Statement Filter End------------



  exportPDF() {
    if (!this.transactions || this.transactions.length === 0) {
      console.error('No transactions to export.');
      return;
    }

    const data = this.transactionTable?.nativeElement;
    if (data) {
      html2canvas(data, { scale: 2 }).then(canvas => { // scale 2 improves image clarity
        const imgWidth = 180; // Leave 15mm margin on both sides for A4
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');

        // ---------- Add Title/Header ----------
        pdf.setFontSize(18);
        pdf.text('MK Bank', 105, 15, { align: 'center' });
        pdf.setFontSize(14);
        pdf.text('Transaction Statement', 105, 25, { align: 'center' });
        pdf.setFontSize(12);
        pdf.text(`Account Holder: ${this.transactions[0].account.name}`, 15, 35);
        pdf.text(`Account ID: ${this.transactions[0].account.id}`, 15, 42);

        // ---------- Add Table Image ----------
        let position = 50; // Leave space for header
        pdf.addImage(contentDataURL, 'PNG', 15, position, imgWidth, imgHeight); // 15mm left margin

        pdf.save('transaction-statement.pdf');
      });
    } else {
      console.error('Table element not found for PDF export');
    }
  }





  // transactions: TransactionDTO[] = [];
  // loading: boolean = true;
  // errorMessage: string = '';
  // accountId: number = 0;


  // constructor(
  //   private transactionService: Transactionsservice,
  //   private cdr: ChangeDetectorRef
  // ) { }


  // ngOnInit(): void {
  //   const savedAccountId = localStorage.getItem('accountId');
  //   if (savedAccountId) {
  //     this.accountId = Number(savedAccountId);
  //     this.loadTransactions();
  //   } else {
  //     this.errorMessage = 'No account information found. Please login!';
  //     this.loading = false;
  //   }
  // }

  // loadTransactions() {
  //   this.transactionService.getTransactionsByAccount(this.accountId).subscribe({
  //     next: (data) => {
  //       this.transactions = data;
  //       this.loading = false;
  //       this.cdr.markForCheck();
  //     },
  //     error: (err) => {
  //       console.error('Failed to load transactions', err);
  //       this.errorMessage = 'Failed to load transactions';
  //       this.loading = false;
  //     }
  //   });
  // }

}
