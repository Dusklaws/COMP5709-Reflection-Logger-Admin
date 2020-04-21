import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { ChartsModule } from 'ng2-charts';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { LoginPageComponent } from './pages/login/login.page';
import { StudentsPageComponent } from './pages/students/students.page';
import { CalendarPageComponent } from './pages/calendar/calendar.page';
import { JournalsPageComponent } from './pages/journals/journals.page';
import { BarchartComponent } from './components/barchart/barchart.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    StudentsPageComponent,
    CalendarPageComponent,
    JournalsPageComponent,
    ToolbarComponent,
    BarchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatCardModule,
    MatButtonModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
