import { Component, OnInit } from '@angular/core';
import { UserService } from '../../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../../model/user.model';
import { Accounts } from '../../model/accounts.model';
import { Accountsservice } from '../../service/accountsservice';
import { Transactionsservice } from '../../service/transactionsservice';

@Component({
  selector: 'app-usercomponent',
  standalone: false,
  templateUrl: './usercomponent.html',
  styleUrl: './usercomponent.css'
})
export class Usercomponent implements OnInit {

  userAccountForm !: FormGroup
   selectedFile: File | null = null;

  constructor(
    private userService: UserService,
    private accountService: Accountsservice,
    private formbuilder: FormBuilder,
    private transactionService: Transactionsservice,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.userAccountForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      type: ['user', Validators.required],
      balance: ['', Validators.required],
      photoUrl: ['']
    });
  }

    onFileSelected(event: any) {
    if(event.target.files && event.target.files.length > 0){
      this.selectedFile = event.target.files[0];
    }
  }


  onSubmit() {
    if (this.userAccountForm.valid) {
      const { name, email, password, type, balance, photoUrl } = this.userAccountForm.value;

      const userObj = { name, email, password, photoUrl };
      const accountObj = {
        type,
        balance: Number(balance),
        userName: name,
        activeStatus: true,
        photo: photoUrl
      };

      const formData = new FormData();
      formData.append('user', JSON.stringify(userObj));
      formData.append('account', JSON.stringify(accountObj));
      if(this.selectedFile){
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }

      this.accountService.registerAccount(formData).subscribe({
        next: () => {
          alert('User and Account saved successfully!');
          this.userAccountForm.reset();
          this.selectedFile = null;
        },
        error: (err) => {
          console.error(err);
          alert('Failed to save user and account.');
        }
      });
    }
  }



  loadUserWithAccounts(userId: number) {
    this.userService.getUserById(userId).subscribe(user => {
      this.accountService.getAccountsByUserId(userId).subscribe(accounts => {
        console.log('User:', user);
        console.log('Accounts:', accounts);
      });
    });
  }

}
