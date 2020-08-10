import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './material/material.module';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Pipes
import { CustomDatePipe } from './pipes/custom-date.pipe';

// Pages
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

// Interceptors
import { httpInterceptorProviders } from './interceptors/index';

// Components
import { HeaderResponsiveComponent } from './components/header-responsive/header-responsive.component';
import { SimpleLineChartComponent } from './components/charts/simple-line-chart/simple-line-chart.component';
import { FooterResponsiveComponent } from './components/footer-responsive/footer-responsive.component';
import { SummaryComponent } from './pages/dashboard-page/summary/summary.component';
import { BalanceComponent } from './pages/dashboard-page/balance/balance.component';
import { TransactionHistoryComponent } from './pages/dashboard-page/transaction-history/transaction-history.component';
import { SigninformComponent } from './pages/login-page/signinform/signinform.component';
import { SignupformComponent } from './pages/login-page/signupform/signupform.component';
import { SideMenuProfileComponent } from './pages/dashboard-page/side-menu-profile/side-menu-profile.component';
import { SideMenuOptionsComponent } from './pages/dashboard-page/side-menu-options/side-menu-options.component';
import { HomePageComponent } from './pages/dashboard-page/home-page/home-page.component';
import { MakeTransactionPageComponent } from './pages/dashboard-page/make-transaction-page/make-transaction-page.component';
import { UserFeedbackComponent } from './dialogs/user-feedback/user-feedback.component';
import { CreateAccountComponent } from './pages/create-account/create-account.component';
import { ConfirmComponent } from './dialogs/confirm/confirm.component';
import { AccountTypeInfoComponent } from './components/account-type-info/account-type-info.component';


@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginPageComponent,
    DashboardPageComponent,
    HeaderResponsiveComponent,
    SimpleLineChartComponent,
    FooterResponsiveComponent,
    SummaryComponent,
    BalanceComponent,
    TransactionHistoryComponent,
    SigninformComponent,
    SignupformComponent,
    CustomDatePipe,
    SideMenuProfileComponent,
    SideMenuOptionsComponent,
    HomePageComponent,
    MakeTransactionPageComponent,
    UserFeedbackComponent,
    CreateAccountComponent,
    ConfirmComponent,
    AccountTypeInfoComponent
  ],
  imports: [
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
