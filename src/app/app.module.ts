import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppFirebaseModule } from './firebase/firebase.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './app.component';
import { AddButtonComponent } from './add-button/add-button.component';
import {
  AddDialogComponent,
  DeleteDialogComponent,
} from './add-dialog/add-dialog.component';
import { HelloComponent } from './hello.component';
import { ImportExcelButtonComponent } from './import-excel-button/import-excel-button.component';
import { MTableComponent } from './mtable/mtable.component';

import { ExcelService } from './excel.service';

@NgModule({
  imports: [
    AppFirebaseModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  declarations: [
    AddButtonComponent,
    AddDialogComponent,
    AppComponent,
    DeleteDialogComponent,
    HelloComponent,
    ImportExcelButtonComponent,
    MTableComponent,
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
