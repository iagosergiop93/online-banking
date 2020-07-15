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

// Pages
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';

// Interceptors
import { httpInterceptorProviders } from './interceptors/index';

// Components
import { HeaderResponsiveComponent } from "./components/header-responsive/header-responsive.component";
import { SimpleLineChartComponent } from "./components/charts/simple-line-chart/simple-line-chart.component";
import { FooterResponsiveComponent } from './components/footer-responsive/footer-responsive.component';
import { SummaryComponent } from './pages/dashboard-page/summary/summary.component';
import { BalanceComponent } from './pages/dashboard-page/balance/balance.component';
import { TransactionHistoryComponent } from './pages/dashboard-page/transaction-history/transaction-history.component';


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
    TransactionHistoryComponent
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
