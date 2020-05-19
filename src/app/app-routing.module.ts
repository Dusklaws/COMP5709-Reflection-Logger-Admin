import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginGuard } from './guards/login.guard';
import { GeneralGuard } from './guards/general.guard';
import { LoginPageComponent } from './pages/login/login.page';
import { StudentsPageComponent } from './pages/students/students.page';
import { CalendarPageComponent } from './pages/calendar/calendar.page';
import { LogPageComponent } from './pages/log/log.page';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginPageComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'students',
    component: StudentsPageComponent,
    canActivate: [GeneralGuard]
  },
  {
    path: 'logs/:email',
    component: CalendarPageComponent,
    canActivate: [GeneralGuard]
  },
  {
    path: 'log/:email/:submissionTime',
    component: LogPageComponent,
    canActivate: [GeneralGuard]
  },
  {
    path: '**',
    component: StudentsPageComponent,
    canActivate: [GeneralGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
