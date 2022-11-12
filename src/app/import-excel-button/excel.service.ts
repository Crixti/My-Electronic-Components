import { Injectable } from '@angular/core';
import xlsxParser from 'xls-parser';
import { v4 as uuidv4 } from 'uuid';
import { from, map, Observable } from 'rxjs';
import { ElectronicComponent } from '../models';

@Injectable()
export class ExcelService {
  constructor() {}

  parse(file: File): Observable<ElectronicComponent[]> {
    console.log('file: ', file.name);

    return from(xlsxParser.onFileSelection(file)).pipe(
      map((data) => {
        const sheet = data[Object.keys(data)[0]];
        const list = (<any>Object)
          .entries(sheet)
          .map(([key, value]) => this.mapEC(parseInt(key) + 1, value));
        return list;
      })
    );
  }

  private mapEC(key: number, value: Object): ElectronicComponent {
    return {
      id: uuidv4(),
      position: key,
      name: value['Name'],
      count: parseInt(value['Count']),
      package: value['Package'] || '',
      category: value['Category'] || '',
      description: value['Type'] || '',
      link: value['Comments'] || '',
    };
  }
}
