import { NgModule, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';

import { provideHttpClient, withFetch } from '@angular/common/http';
import { AddJobseesker } from './component/jonseeker/add-jobseesker/add-jobseesker';
import { ViewAllJobseesker } from './component/jonseeker/view-all-jobseesker/view-all-jobseesker';
import { AllUserComponent } from './component/user/all-user-component/all-user-component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Footer } from './layout/footer/footer';
import { Navbar } from './layout/navbar/navbar';
import { Sidebar } from './layout/sidebar/sidebar';
import { JobseekerProfileComponent } from './component/jobseeker-profile-component/jobseeker-profile-component';
import { LoginComponent } from './component/login-component/login-component';

@NgModule({
  declarations: [
    App,
   AllUserComponent,
    AddJobseesker,
    ViewAllJobseesker,
    Footer,
    Navbar,
    Sidebar,
    JobseekerProfileComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
   
  ],
  providers: [
    provideHttpClient(withFetch()),
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideClientHydration(withEventReplay())
  ],
  bootstrap: [App]
})
export class AppModule { }
