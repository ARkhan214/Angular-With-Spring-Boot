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
import { OnlyAddUser } from './components/only-add-user/only-add-user';
import { AccountHolderProfile } from './auth/account-holder-profile/account-holder-profile';
import { EmployeeProfile } from './auth/employee-profile/employee-profile';
import { EmployeeComponent } from './components/employee-component/employee-component';
import { Logout } from './auth/logout/logout';
import { EmployeeTransaction } from './components/employee-transaction/employee-transaction';
import { AccTranStatement } from './statements/acc-tran-statement/acc-tran-statement';
import { EmpTranStatement } from './statements/emp-tran-statement/emp-tran-statement';
import { ViewAllEmployee } from './components/view-all-employee/view-all-employee';
import { ForgotPasswordComponent } from './components/forgot-password-component/forgot-password-component';
import { ResetPasswordComponent } from './components/reset-password-component/reset-password-component';
import { WaterBillComponent } from './payments/water-bill-component/water-bill-component';
import { MobileBillComponent } from './payments/mobile-bill-component/mobile-bill-component';
import { CreditCardBillComponent } from './payments/credit-card-bill-component/credit-card-bill-component';
import { ElectricityBillComponent } from './payments/electricity-bill-component/electricity-bill-component';
import { GasBillComponent } from './payments/gas-bill-component/gas-bill-component';
import { InternetBillComponent } from './payments/internet-bill-component/internet-bill-component';
import { ApplyLoanComponent } from './loan/apply-loan-component/apply-loan-component';
import { ViewAllLoans } from './loan/view-all-loans/view-all-loans';
import { PayLoan } from './loan/pay-loan/pay-loan';
import { AdminLoanApproveComponent } from './loan/admin-loan-approve-component/admin-loan-approve-component';
import { FixedDeposit } from './model/fixedDeposit.model';
import { FixedDepositComponent } from './components/fixed-deposit-component/fixed-deposit-component';
import { ViewAllFd } from './components/view-all-fd/view-all-fd';




const routes: Routes = [
  { path: '', component: Home },
  { path: 'adduser', component: Usercomponent },
  { path: 'addemployee', component: EmployeeComponent },
  { path: 'viewalluser', component: Viewallusercomponent },
  { path: 'updateuser/:id', component: Updateusercomponent },
  { path: 'viewallaccount', component: ViewAllAccounts },
  { path: 'viewallemp', component: ViewAllEmployee },
  { path: 'deposit', component: DepositComponent },
  { path: 'withdraw', component: WithdrawComponent },
  { path: 'about', component: AboutBank },
  { path: 'transaction', component: TransactionComponent },
  { path: 'addtr', component: Addtransaction },
  { path: 'emptr', component: EmployeeTransaction },
  { path: 'trst', component: TransactionStatement },
  { path: 'acctrst', component: AccTranStatement },
  { path: 'emptrst', component: EmpTranStatement },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'user-profile', component: UserProfile },
  { path: 'account-profile', component: AccountHolderProfile },
  { path: 'employee-profile', component: EmployeeProfile },
  { path: 'admin-profile', component: AdminProfile },
  { path: 'contact', component: ContactUs },
  { path: 'admindash', component: AdminDashboard },
  { path: 'onlyadduser', component: OnlyAddUser },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'reset-password', component: ResetPasswordComponent },
  { path: 'water-bill', component: WaterBillComponent },
  { path: 'mobile-bill', component: MobileBillComponent },
  { path: 'credit-card-bill', component: CreditCardBillComponent },
  { path: 'electricity-bill', component: ElectricityBillComponent },
  { path: 'gas-bill', component: GasBillComponent },
  { path: 'internet-bill', component: InternetBillComponent },
  { path: 'apply-loan', component: ApplyLoanComponent },
  { path: 'view-all-loan', component: ViewAllLoans },
  { path: 'pay-loan', component: PayLoan },
  { path: 'admin-approval-loan', component: AdminLoanApproveComponent },
  { path: 'fd', component: FixedDepositComponent },
  { path: 'view-all-fd', component: ViewAllFd },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
