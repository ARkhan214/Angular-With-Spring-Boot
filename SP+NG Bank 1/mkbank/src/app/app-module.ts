import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Home } from './home/home';
import { Navbar } from './layout/navbar/navbar';


import { Footer } from './layout/footer/footer';
import { Usercomponent } from './components/usercomponent/usercomponent';
import { Viewallusercomponent } from './components/viewallusercomponent/viewallusercomponent';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { Updateusercomponent } from './components/updateusercomponent/updateusercomponent';
import { ViewAllAccounts } from './components/view-all-accounts/view-all-accounts';
import { DepositComponent } from './components/deposit-component/deposit-component';
import { WithdrawComponent } from './components/withdraw-component/withdraw-component';
import { TransactionComponent } from './components/transaction-component/transaction-component';
import { AboutBank } from './layout/about-bank/about-bank';
import { Addtransaction } from './components/addtransaction/addtransaction';
import { TransactionStatement } from './components/transaction-statement/transaction-statement';
import { Login } from './auth/login/login';
import { Logout } from './auth/logout/logout';
import { UserProfile } from './auth/user-profile/user-profile';
import { AdminProfile } from './auth/admin-profile/admin-profile';
import { ContactUs } from './layout/contact-us/contact-us';
import { AdminDashboard } from './components/admin-dashboard/admin-dashboard';
import { Sidebar } from './layout/sidebar/sidebar';
import { OnlyAddUser } from './components/only-add-user/only-add-user';
import { LoanComponent } from './components/loan-component/loan-component';
import { FixedDepositComponent } from './components/fixed-deposit-component/fixed-deposit-component';
import { DpsComponent } from './components/dps-component/dps-component';
import { AccountHolderProfile } from './auth/account-holder-profile/account-holder-profile';
import { EmployeeProfile } from './auth/employee-profile/employee-profile';
import { AuthInterceptor } from './service/auth.interceptor';
import { EmployeeComponent } from './components/employee-component/employee-component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { EmployeeTransaction } from './components/employee-transaction/employee-transaction';
import { AccTranStatement } from './statements/acc-tran-statement/acc-tran-statement';
import { EmpTranStatement } from './statements/emp-tran-statement/emp-tran-statement';
import { ViewAllEmployee } from './components/view-all-employee/view-all-employee';
import { ForgotPasswordComponent } from './components/forgot-password-component/forgot-password-component';
import { ResetPasswordComponent } from './components/reset-password-component/reset-password-component';
import { ElectricityBillComponent } from './payments/electricity-bill-component/electricity-bill-component';
import { GasBillComponent } from './payments/gas-bill-component/gas-bill-component';
import { WaterBillComponent } from './payments/water-bill-component/water-bill-component';
import { InternetBillComponent } from './payments/internet-bill-component/internet-bill-component';
import { MobileBillComponent } from './payments/mobile-bill-component/mobile-bill-component';
import { CreditCardBillComponent } from './payments/credit-card-bill-component/credit-card-bill-component';


@NgModule({
  declarations: [
    App,
    Home,
    Navbar,
    Sidebar,
    Footer,
    Usercomponent,
    Viewallusercomponent,
    Updateusercomponent,
    ViewAllAccounts,
    DepositComponent,
    WithdrawComponent,
    TransactionComponent,
    AboutBank,
    Addtransaction,
    TransactionStatement,
    Login,
    Logout,
    UserProfile,
    AdminProfile,
    ContactUs,
    AdminDashboard,
    OnlyAddUser,
    LoanComponent,
    FixedDepositComponent,
    DpsComponent,
    AccountHolderProfile,
    EmployeeProfile,
    EmployeeComponent,
    EmployeeTransaction,
    AccTranStatement,
    EmpTranStatement,
    ViewAllEmployee,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    ElectricityBillComponent,
    GasBillComponent,
    WaterBillComponent,
    InternetBillComponent,
    MobileBillComponent,
    CreditCardBillComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // notun project neyar por eta likhte hobe
    FormsModule,
    ReactiveFormsModule,
    MatSnackBarModule

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),

    // notun project neyar por eta likhte hobe
    provideHttpClient(withFetch()),
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [App]
})
export class AppModule { }
