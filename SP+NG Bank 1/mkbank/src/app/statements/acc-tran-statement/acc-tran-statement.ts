import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TransactionDTO } from '../../model/transactionStatementDTO.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environment/environment';
import { Transactionsservice } from '../../service/transactionsservice';


// Import jsPDF and html2canvas for PDF export
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { console } from 'inspector';

@Component({
  selector: 'app-acc-tran-statement',
  standalone: false,
  templateUrl: './acc-tran-statement.html',
  styleUrl: './acc-tran-statement.css'
})
export class AccTranStatement implements OnInit {


  @ViewChild('transactionTable') transactionTable!: ElementRef; // Get table reference

  transactions: TransactionDTO[] = [];
  loading: boolean = true;
  errorMessage: string = '';

  totalWithdraw: number = 0;
  totalDeposit: number = 0;
  totalBalance: number = 0;

  //For Traansaction Statement Filter Start-------------------
  startDate: string = '';
  endDate: string = '';
  type: string = '';
  transactionType: string = '';
  //For Traansaction Statement Filter End----------------------


  private baseUrl = environment.springUrl;

  constructor(
    private http: HttpClient,
    private transactionService: Transactionsservice,
    private cdr: ChangeDetectorRef


  ) { }

  ngOnInit(): void {
    // this.getTransactionStatement();

    this.transactionService.getStatement().subscribe({
      next: (data) => {
        this.transactions = data;
        console.log(this.transactions + "Profile data ");
        this.cdr.markForCheck();

      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });

    
    // this.computeTotals();



  }



  // computeTotals() {
  //   this.totalWithdraw = 0;
  //   this.totalDeposit = 0;
  //   this.totalBalance = 0;

  //   for (let tx of this.transactions) {
  //     if (tx.type === 'DEBIT') {
  //       this.totalWithdraw += tx.amount!;
  //     } else if (tx.type === 'CREDIT') {
  //       this.totalDeposit += tx.amount!;
  //     }

  //     this.totalBalance = tx.account.balance ?? tx.account.balance; // last balance
  //   }

  //   console.log(this.totalWithdraw+"1111111111111111111111111");
  //   console.log(this.totalDeposit+"22222222222222222222222222");
  //   console.log(this.totalBalance+"333333333333333333333333333");

  // }




  




  //For Traansaction Statement Filter Start---------------------
  applyFilter() {
    this.loading = true;
    this.errorMessage = '';

    this.transactionService.getTransactionsWithFilterForAccountHolder(
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


  // ---------------- PDF Export Function -----------------
  // exportPDF() {
  //   const data = this.transactionTable?.nativeElement; // Get the table div via ViewChild
  //   if (data) {
  //     html2canvas(data).then(canvas => {
  //       const imgWidth = 208;
  //       const pageHeight = 295;
  //       const imgHeight = canvas.height * imgWidth / canvas.width;
  //       const contentDataURL = canvas.toDataURL('image/png');

  //       const pdf = new jsPDF('p', 'mm', 'a4');
  //       let position = 0;

  //       // ---------- Add Title/Header ----------
  //       pdf.setFontSize(18);
  //       pdf.text('MK Bank', 105, 10, { align: 'center' }); // Bank Name at top
  //       pdf.setFontSize(14);
  //       pdf.text('Transaction Statement', 105, 16, { align: 'center' }); // Statement title
  //       pdf.setFontSize(12);
  //       pdf.text(`Account Holder: ${this.transactions[0].accountHolderName}`, 14, 24); // example name
  //       pdf.text(`Account ID: ${this.transactions[0].id}`, 14, 30); // example account id



  //       pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
  //       pdf.save('transaction-statement.pdf');
  //     });
  //   } else {
  //     console.error('Table element not found for PDF export');
  //   }
  // }



  exportPDF() {
    if (!this.transactions || this.transactions.length === 0) {
      console.error('No transactions to export.');
      return;
    }

    const data = this.transactionTable?.nativeElement;
    if (data) {
      html2canvas(data).then(canvas => {
        const imgWidth = 208; // A4 width
        const pageHeight = 295;
        const imgHeight = canvas.height * imgWidth / canvas.width;
        const contentDataURL = canvas.toDataURL('image/png');

        const pdf = new jsPDF('p', 'mm', 'a4');

        // ---------- Add Title/Header ----------
        pdf.setFontSize(18);
        pdf.text('MK Bank', 105, 10, { align: 'center' }); // Bank Name at top
        pdf.setFontSize(14);
        pdf.text('Transaction Statement', 105, 16, { align: 'center' }); // Statement title
        pdf.setFontSize(12);
        pdf.text(`Account Holder: ${this.transactions[0].account.name}`, 14, 24);
        pdf.text(`Account ID: ${this.transactions[0].account.id}`, 14, 30);

        // ---------- Add Table Image ----------
        let position = 35; // leave space for header
        pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);

        pdf.save('transaction-statement.pdf');
      });
    } else {
      console.error('Table element not found for PDF export');
    }
  }


}
