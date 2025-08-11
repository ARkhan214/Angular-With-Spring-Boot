import { ChangeDetectorRef, Component, Inject, PLATFORM_ID } from '@angular/core';
import { JobSeeker } from '../../model/jobSeeker.model';
import { JobseekerService } from '../../service/jobseeker-service';
import { Education } from '../../model/education';
import { EducationService } from '../../service/education-service';
import { isPlatformBrowser } from '@angular/common';

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
    board:'',
    result: '',
    year: ''
  };

  constructor(
    private jobSeekerService: JobseekerService, 
    private cdr:ChangeDetectorRef,
    private educationService:EducationService,
     @Inject(PLATFORM_ID) private platformId: object
  ){}


  ngOnInit(): void{

    if(isPlatformBrowser(this.platformId)){
    this.getProfile();
    this.loadEducations();    
  }else{
     console.warn('Not running in browser — skipping profile/education load.');
  }
   
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
        this.newEducation = { level: '', institute: '', result: '', year: '' ,board:''};  // Reset form
        alert("Education added successfully");
        this.cdr.markForCheck();
        this.loadEducations();
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
