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
import { provideHttpClient, withFetch } from '@angular/common/http';
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


@NgModule({
  declarations: [
    App,
    Home,
    Navbar,  
    Footer, Usercomponent, Viewallusercomponent, Updateusercomponent, ViewAllAccounts, DepositComponent, WithdrawComponent, TransactionComponent, AboutBank, Addtransaction, TransactionStatement, Login, Logout, UserProfile, AdminProfile, ContactUs, AdminDashboard,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    // notun project neyar por eta likhte hobe
    FormsModule,
    ReactiveFormsModule

  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay()),

    // notun project neyar por eta likhte hobe
    provideHttpClient(withFetch())
  ],
  bootstrap: [App]
})
export class AppModule { }
