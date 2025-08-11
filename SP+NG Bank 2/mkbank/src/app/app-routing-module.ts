import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Home } from './home/home';
import { Viewallusercomponent } from './components/viewallusercomponent/viewallusercomponent';
import { Usercomponent } from './components/usercomponent/usercomponent';
import { Updateusercomponent } from './components/updateusercomponent/updateusercomponent';
import { ViewAllAccounts } from './components/view-all-accounts/view-all-accounts';
import { DepositComponent } from './components/deposit-component/deposit-component';
import { WithdrawComponent } from './components/withdraw-component/withdraw-component';
import { AboutBank } from './layout/about-bank/about-bank';
import { TransactionComponent } from './components/transaction-component/transaction-component';
import { Addtransaction } from './components/addtransaction/addtransaction';
import { TransactionStatement } from './components/transaction-statement/transaction-statement';
import { Login } from './auth/login/login';
import { UserProfile } from './auth/user-profile/user-profile';
import { AdminProfile } from './auth/admin-profile/admin-profile';
import { ContactUs } from './layout/contact-us/contact-us';
import { UserGuard } from './guards/user-guard';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';




const routes: Routes = [
  {path:'',component:Home},
  {path:'adduser',component:Usercomponent},
  {path:'viewalluser',component:Viewallusercomponent},
  {path:'updateuser/:id',component:Updateusercomponent},
  {path:'viewallaccount',component:ViewAllAccounts},
  {path:'deposit',component:DepositComponent},
  {path:'withdraw',component:WithdrawComponent},
  {path:'about',component:AboutBank},
  {path:'transaction',component:TransactionComponent},
  {path:'addtr',component:Addtransaction},
  {path:'trst',component:TransactionStatement},
  {path:'login',component:Login},
  {path: 'user-profile', component: UserProfile},
  {path: 'admin-profile', component: AdminProfile},
  {path: 'contact', component: ContactUs},
  {path: 'admindash', component: AdminDashboard},


  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
