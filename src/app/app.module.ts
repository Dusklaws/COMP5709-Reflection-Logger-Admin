import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { ChartsModule } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list/';
import { MatNativeDateModule } from '@angular/material/core/';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CalendarPageComponent } from './pages/calendar/calendar.page';
import { ChartComponent } from './components/chart/chart.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { ErrorComponent } from './components/error/error.component';
import { LoadingComponent } from './components/loading/loading.component';
import { LoginPageComponent } from './pages/login/login.page';
import { LogPageComponent } from './pages/log/log.page';
import { RadarComponent } from './components/radar/radar.component';
import { StudentsPageComponent } from './pages/students/students.page';
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    ChartsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatNativeDateModule,
    MatListModule,
    MatProgressSpinnerModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatToolbarModule,
    ReactiveFormsModule,
    CalendarModule.forRoot({ provide: DateAdapter, useFactory: adapterFactory })
  ],
  declarations: [
    AppComponent,
    CalendarPageComponent,
    ChartComponent,
    DialogComponent,
    ErrorComponent,
    LoadingComponent,
    LoginPageComponent,
    LogPageComponent,
    RadarComponent,
    StudentsPageComponent,
    ToolbarComponent
  ],
  entryComponents: [DialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
