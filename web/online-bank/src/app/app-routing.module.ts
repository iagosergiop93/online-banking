import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Guards
import { AuthGuard } from './guards/auth.guard';

// Components
import { LandingPageComponent } from './pages/landing-page/landing-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { HomePageComponent } from './pages/dashboard-page/home-page/home-page.component';
import { MakeTransactionPageComponent } from './pages/dashboard-page/make-transaction-page/make-transaction-page.component';

const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login',
    children: [
      { path: 'signin', component: LoginPageComponent },
      { path: 'signup', component: LoginPageComponent },
      { path: '', redirectTo: 'signin', pathMatch: 'full' }
    ]
  },

  { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomePageComponent },
      { path: 'deposit', component: MakeTransactionPageComponent },
      { path: 'withdraw', component: MakeTransactionPageComponent },
      { path: '', redirectTo: 'home', pathMatch: 'full' }
    ]
  },
  { path: '**', redirectTo: '', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }