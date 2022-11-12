import { Component, ElementRef, ViewChild } from '@angular/core';
import { ExcelService } from './excel.service';
import { DatabaseService } from '../firebase/database.service';
import { map, mergeMap } from 'rxjs';

@Component({
  selector: 'import-excel-button',
  templateUrl: './import-excel-button.component.html',
  styleUrls: ['./import-excel-button.component.css'],
})
export class ImportExcelButtonComponent {
  @ViewChild('fileInput')
  fileInput: ElementRef;
  private database: DatabaseService;
  private excel: ExcelService;

  constructor(excel: ExcelService, database: DatabaseService) {
    this.database = database;
    this.excel = excel;
  }

  onClickFileInputButton(): void {
    this.fileInput.nativeElement.click();
  }

  onChangeFileInput(): void {
    const files: { [key: string]: File } = this.fileInput.nativeElement.files;
    const file = files[0];

    this.excel.parse(file)
      .pipe(mergeMap(components => this.database.saveComponents(components)))
      .subscribe({
        next: () => console.log('import success'),
        error: (e) => console.error('import error', e)
      });
  }
}
