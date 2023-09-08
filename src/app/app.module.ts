import { NgModule,NO_ERRORS_SCHEMA,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatCardModule} from "@angular/material/card";
import {MAT_DATE_LOCALE, MatNativeDateModule} from '@angular/material/core';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import { FilterPipe } from './filter.pipe';
import { DatePipe } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import { AdminComponent } from './admin/admin.component';
import { ReservationComponent } from './reservation/reservation.component';
import { SortByTimePipe } from './sort-by-time.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FilterPipe,
    AdminComponent,
    ReservationComponent,
    SortByTimePipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    HttpClientModule

  ],

  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'en-GB'},DatePipe,
  ],
  bootstrap: [AppComponent],schemas: [
    CUSTOM_ELEMENTS_SCHEMA,
    NO_ERRORS_SCHEMA
  ]
})
export class AppModule {
  selected!: Date | null;
}
