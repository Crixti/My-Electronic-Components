import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

import { AppFirebaseModule } from './firebase/firebase.module';
import { MaterialModule } from './material.module';

import { AppComponent } from './root/app.component';
import { ContentComponent } from './content/content.component';
import { LoginComponent } from './login/login.component';

import { AddButtonComponent } from './add-button/add-button.component';
import {
  AddDialogComponent,
  DeleteDialogComponent,
} from './add-dialog/add-dialog.component';
import { ImportExcelButtonComponent } from './import-excel-button/import-excel-button.component';
import { MTableComponent } from './mtable/mtable.component';

import { ExcelService } from './import-excel-button/excel.service';

@NgModule({
  imports: [
    AppFirebaseModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    // RouterModule.forRoot([
    //   { path: 'login', component: LoginComponent },
    //   { path: 'content', component: ContentComponent },
    //   { path: '', redirectTo: '/content', pathMatch: 'full' },
    // ]),
  ],
  declarations: [
    AddButtonComponent,
    AddDialogComponent,
    AppComponent,
    ContentComponent,
    DeleteDialogComponent,
    ImportExcelButtonComponent,
    LoginComponent,
    MTableComponent,
  ],
  providers: [ExcelService],
  bootstrap: [AppComponent],
})
export class AppModule {}
