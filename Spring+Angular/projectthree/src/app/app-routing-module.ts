import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUserComponent } from './component/user/all-user-component/all-user-component';
import { AddJobseesker } from './component/jonseeker/add-jobseesker/add-jobseesker';
import { LoginComponent } from './component/login-component/login-component';
import { JobseekerProfileComponent } from './component/jobseeker-profile-component/jobseeker-profile-component';


const routes: Routes = [
  {path:'',component:AllUserComponent},
  {path:'addjobseeker',component:AddJobseesker},
  {path:'login',component:LoginComponent},
  {path:'jobsekpro',component:JobseekerProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
