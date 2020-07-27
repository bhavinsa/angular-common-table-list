import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatPaginatorModule, MatDialogModule, MatSnackBarModule } from '@angular/material';
import { HomeComponent } from './home/home.component';
import { TableComponent } from './table/table.component';
import { ConfirmationDialog } from './table/table.component';
import { AboutComponent } from './about/about.component';
import { MatInputModule, MatButtonModule, MatSelectModule, MatIconModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { MaterialDesignFrameworkModule } from 'angular7-json-schema-form';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { MatPaginatorGotoComponent } from './mat-paginator-goto/mat-paginator-goto.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TableComponent,
    MatPaginatorGotoComponent,
    AboutComponent,
    ConfirmationDialog,
    DynamicFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatSortModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSnackBarModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatIconModule,
    MaterialDesignFrameworkModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ConfirmationDialog]
})
export class AppModule { }
