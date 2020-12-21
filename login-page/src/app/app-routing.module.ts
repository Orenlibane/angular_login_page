import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {AfterLoginComponent} from './after-login/after-login.component';

const routes: Routes = [
  {path: '', component: LoginPageComponent},
  {path: 'afterLogin', component: AfterLoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
