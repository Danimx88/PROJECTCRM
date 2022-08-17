import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from "./Components/navbar/navbar.component";
import { FooterComponent } from './Components/footer/footer.component';
import { ClienteListComponent } from './Components/Cliente/list/list.component';
import ClienteFormComponent from './Components/Cliente/form/form.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { UserbarComponent } from './Components/userbar/userbar.component';
import { DataTablesModule } from "angular-datatables";
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorIntl, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from "@angular/material/sort";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CustomMatPaginatorIntService } from './custom-mat-paginator-int.service';
import { FormUserComponent } from './Components/Usuario/form/form.component';
import { ListUserComponent } from './Components/Usuario/list/list.component';
import { ListCitaComponent } from './Components/Cita/list-cita/list-cita.component';
import { FormCitaComponent } from './Components/Cita/form-cita/form-cita.component';
import { BodyComponent } from './Components/Public/body/body.component';
import { LoginComponent } from './Components/Auth/login/login.component';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatIconModule } from "@angular/material/icon";
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { MatCheckboxModule} from "@angular/material/checkbox";
import { MatListModule } from "@angular/material/list";





const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
  },
  display: {
    dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    ClienteListComponent,
    ClienteFormComponent,
    SidebarComponent,
    UserbarComponent,
    ListUserComponent,
    FormUserComponent,
    ListCitaComponent,
    FormCitaComponent,
    BodyComponent,
    LoginComponent,
    PagenotfoundComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    DataTablesModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    FlexLayoutModule,
    MatCheckboxModule,
    MatListModule,
    NgxMaterialTimepickerModule.setLocale('es-MX'),
  ],
  providers: [
    { provide: MatPaginatorIntl, useClass: CustomMatPaginatorIntService },
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService, MatDatepickerModule,
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
