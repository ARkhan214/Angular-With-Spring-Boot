import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../service/user.service';

@Component({
  selector: 'app-only-add-user',
  standalone: false,
  templateUrl: './only-add-user.html',
  styleUrl: './only-add-user.css'
})
export class OnlyAddUser implements OnInit{

  userForm !: FormGroup 
  selectedFile: File | null = null;

  constructor(
    private formbuilder: FormBuilder,
    private userService: UserService
  ){}


  ngOnInit(): void {
      this.userForm = this.formbuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      nid: ['', Validators.required],
      phone: ['',Validators.required],
      address: ['',Validators.required],
      photoUrl: ['']
    });
  }

    onFileSelected(event: any) {
    if(event.target.files && event.target.files.length > 0){
      this.selectedFile = event.target.files[0];
    }
  }


 onSubmit(){
  if(this.userForm.valid){

    const { name, email, password,nid,phone,address, photoUrl} = this.userForm.value;
    const userObj = { name, email, password,nid,phone,address, photoUrl };
   
      const formData = new FormData();
      formData.append('user', JSON.stringify(userObj));
      if(this.selectedFile){
        formData.append('photo', this.selectedFile, this.selectedFile.name);
      }

      this.userService.registerUser(formData).subscribe({
        next:()=>{
           alert('User saved successfully!');
          this.userForm.reset();
          this.selectedFile = null;
        },  
        error:(err)=>{
          console.error(err);
          alert('Failed to save user.');
        }
      })
  }
 }


}
