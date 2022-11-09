import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';

import { AppComponent } from './app.component';
import { AddButtonComponent } from './add-button/add-button.component';
import { HelloComponent } from './hello.component';
import { ImportExcelButtonComponent } from './import-excel-button/import-excel-button.component';
import { MTableComponent } from './mtable/mtable.component';

import { ExcelService } from './excel.service';

import { AppFirebaseModule } from './firebase/firebase.module';

@NgModule({
  imports: [
    AppFirebaseModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddButtonComponent,
    AppComponent,
    HelloComponent,
    ImportExcelButtonComponent,
    MTableComponent,
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
