import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { authGuard } from './guards/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { TestComponent } from './components/test/test.component';
import { SignupComponent } from './components/signin/signin.component';
import { CategoriesListComponent } from './components/categories-list/categories-list.component';
import { SuppliersListComponent } from './components/suppliersList/suppliersList.component';
import { PaymentsListComponent } from './components/paymentsList/paymentsList.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, canActivate: [authGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'test', component: TestComponent },
  {path: 'signup', component: SignupComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {path:"categories-list", component: CategoriesListComponent},
  {path:"suppliers-list", component: SuppliersListComponent},
  { path: 'payments-list', component:PaymentsListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
