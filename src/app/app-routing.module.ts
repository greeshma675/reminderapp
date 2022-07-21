import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DeleteaccountComponent } from './deleteaccount/deleteaccount.component';
import { EventsComponent } from './events/events.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent
  },
  {
    path:'register',component:RegisterComponent
  },
  {
    path:'home',component:HomeComponent
  },
  {
    path:'events',component:EventsComponent
  },
  {
    path:'delacc',component:DeleteaccountComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
