import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { TransactionDTO } from '../../model/transactionStatementDTO.model';
import { environment } from '../../environment/environment';
import { HttpClient } from '@angular/common/http';
import { Transactionsservice } from '../../service/transactionsservice';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-invoice-for-user',
  standalone: false,
  templateUrl: './invoice-for-user.html',
  styleUrl: './invoice-for-user.css'
})
export class InvoiceForUser implements OnInit{


  
  transaction!: TransactionDTO; // Input from parent

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {}

  exportPDF() {
    if (!this.transaction) return;

    const pdf = new jsPDF();
    pdf.setFontSize(16);
    pdf.text('Invoice', 105, 15, { align: 'center' });

    const account = this.transaction.account;

    pdf.setFontSize(12);
    pdf.text(`Customer Name: ${account.name}`, 15, 40);
    pdf.text(`Transaction ID: ${this.transaction.id}`, 15, 50);
    pdf.text(`Amount: ${this.transaction.amount}`, 15, 60);
    pdf.text(`Type: ${this.transaction.type}`, 15, 70);

    pdf.save(`invoice-${this.transaction.id}.pdf`);
  }


//  transactions: TransactionDTO[] = [];

//    private baseUrl = environment.springUrl;
  
//     constructor(
//       private http: HttpClient,
//       private transactionService: Transactionsservice,
//       private cdr: ChangeDetectorRef
  
  
//     ) { }
  
//     ngOnInit(): void {

  
//       this.transactionService.getStatement().subscribe({
//         next: (data) => {
//           this.transactions = data;
//           console.log(data + "Profile data ");
//           this.cdr.markForCheck();
  
//         },
//         error: (err) => {
//           console.error('Failed to load profile', err);
//         }
//       });
//     }

}
