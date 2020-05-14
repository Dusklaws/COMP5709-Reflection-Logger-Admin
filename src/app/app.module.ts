import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { ChartsModule } from 'ng2-charts';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list/';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ChartComponent } from './components/barchart/chart.component';
import { CalendarPageComponent } from './pages/calendar/calendar.page';
import { LogPageComponent } from './pages/log/log.page';
import { LoginPageComponent } from './pages/login/login.page';
import { StudentsPageComponent } from './pages/students/students.page';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    ChartsModule,
    MatListModule,
    MatChipsModule,
    MatIconModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  declarations: [
    AppComponent,
    LoginPageComponent,
    StudentsPageComponent,
    CalendarPageComponent,
    LogPageComponent,
    ToolbarComponent,
    ChartComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
