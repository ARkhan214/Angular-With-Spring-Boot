import { ChangeDetectorRef, Component } from '@angular/core';
import { JobSeeker } from '../../model/jobSeeker.model';
import { JobseekerService } from '../../service/jobseeker-service';
import { Education } from '../../model/education';
import { EducationService } from '../../service/education-service';

@Component({
  selector: 'app-jobseeker-profile-component',
  standalone: false,
  templateUrl: './jobseeker-profile-component.html',
  styleUrl: './jobseeker-profile-component.css'
})
export class JobseekerProfileComponent {


  jobSeeker: any;

  educations:Education[] = [];

  newEducation = {
    level:'',
    institute: '',
    result: '',
    year: ''
  };

  constructor(
    private jobSeekerService: JobseekerService, 
    private cdr:ChangeDetectorRef,
    private educationService:EducationService
  ){}


  ngOnInit(): void{
   this.getProfile();
   this.loadEducations();
  } 
  
  //education er sob data load hobe
 loadEducations(): void{
  this.educationService.getEducations().subscribe({
    next:(data) => {
      this.educations = data;

      this.cdr.markForCheck();
      
      },
      error: (err) => {
        console.error('Failed to load educations', err);
      }
  });
 }


// profile dekher jonno
 getProfile() {

    this.jobSeekerService.getProfile().subscribe({
      next: (data) => {
        this.jobSeeker = data;
        console.log(data);
        this.cdr.markForCheck();

      },
      error: (err) => {
        console.error('Failed to load profile', err);
      }
    });
  }


  // add Education
  addEducation(): void {
    this.educationService.addEducation(this.newEducation).subscribe({
      next: (addedEdu: any) => {
        if (!this.jobSeeker.educations) {
          this.jobSeeker.educations = [];
        }
        this.jobSeeker.educations.push(addedEdu);  // Update UI
        this.newEducation = { level: '', institute: '', result: '', year: '' };  // Reset form
      },
      error: (err) => {
        console.error('Failed to add education', err);
      }
    });
  }




  // for delete
  deleteEducation(id:number):void{

    if(!confirm('Are you sure you want to delete this education?')){
      return;
    }

    this.educationService.deleteEducation(id).subscribe({
      next:() =>{
        this.loadEducations();
        this.cdr.markForCheck();
      },
      error:(err)=>{
        console.error('Failed to delete education:', err);
        alert('Failed to delete education.')
      }
    });
  }

}
