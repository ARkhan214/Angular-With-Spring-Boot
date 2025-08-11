import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Accountsservice } from '../../service/accountsservice';
import { DepositService } from '../../service/deposit-service';
import { error } from 'console';
import { Transactionsservice } from '../../service/transactionsservice';
import { Transaction } from '../../model/transactions.model';

@Component({
  selector: 'app-deposit-component',
  standalone: false,
  templateUrl: './deposit-component.html',
  styleUrl: './deposit-component.css'
})
export class DepositComponent implements OnInit {
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  



}
