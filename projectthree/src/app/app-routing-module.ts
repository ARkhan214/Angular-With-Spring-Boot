import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllUserComponent } from './component/user/all-user-component/all-user-component';
import { AddJobseesker } from './component/jonseeker/add-jobseesker/add-jobseesker';


const routes: Routes = [
  {path:'',component:AllUserComponent},
  {path:'addjobseeker',component:AddJobseesker},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
