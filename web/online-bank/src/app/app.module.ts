import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Material
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
