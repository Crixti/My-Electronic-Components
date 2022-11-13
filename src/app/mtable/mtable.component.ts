import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  AddDialogComponent,
  DeleteDialogComponent,
} from '../add-dialog/add-dialog.component';
import { DatabaseService } from '../firebase/database.service';
import { FilterData } from '../mfilter/mfilter.component';
// import { FirestoreService } from '../firebase/firestore.service';
import { ECCategory, ElectronicComponent } from '../models';

@Component({
  selector: 'mtable',
  templateUrl: './mtable.component.html',
  styleUrls: ['./mtable.component.css'],
})
export class MTableComponent implements AfterViewInit {
  displayedColumns: string[] = [
    'position',
    'name',
    'count',
    'package',
    'category',
    'description',
    'link',
    'action',
  ];
  dataSource = new MatTableDataSource<ElectronicComponent>();
  
  categories = [
    ECCategory.ADAPTER,
    ECCategory.ADC,
    ECCategory.CONNECTOR,
    ECCategory.EEPROM,
    ECCategory.IC,
    ECCategory.MICROCONTROLLER,
    ECCategory.MISC,
    ECCategory.MODULE,
    ECCategory.PASSIVE,
    ECCategory.REGULATOR,
    ECCategory.REGULATOR_IC,
    ECCategory.SENSOR,
    ECCategory.TRANSISTOR,
  ];
  categoryFilter: ECCategory;
  categoryControl = new FormControl(undefined);

  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private database: DatabaseService,
    // private firestore: FirestoreService,
    private dialog: MatDialog,
    ) {
    console.log('MTableComponent');
    database.getComponents().subscribe(list => {
      console.log('on list: ', list);
      this.isLoadingResults = false;
      this.dataSource.data = list.sort((a, b) => a.position - b.position);
    });
    // firestore.getComponents().subscribe(list => {
    //   console.log('on list2: ', list);
    // });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  editComponent(component, i) {
    console.log('editComponent', i, component);
    const dialogRef = this.dialog.open(AddDialogComponent, { data: component });
    dialogRef.afterClosed().subscribe((result) => {
      console.log('edit-dialog-result:', result);
      if (result) {
        this.database.saveComponent(result).subscribe({
          next: () => console.log('save success'),
          error: (e) => console.error('save error', e)
        });
      }
    });
  }

  deleteComponent(component, i) {
    console.log('deleteComponent', i, component);

    const dialogRef = this.dialog.open(DeleteDialogComponent);
    dialogRef.afterClosed().subscribe((result) => {
      console.log('delete-dialog-result:', result);
      if (result) {
        this.database.deleteComponent(component.id).subscribe({
          next: () => console.log('delete success'),
          error: (e) => console.error('delete error', e)
        });
      }
    });
  }

  reorderComponents() {
    console.log('reorderComponents');
    this.database.reorderBy((c1, c2) => {
      const catComp = c1.category.localeCompare(c2.category);
      if (catComp == 0) {
        return c1.name.localeCompare(c2.name);
      }
      return catComp;
    }).subscribe({
      next: () => console.log('reorder success'),
      error: (e) => console.error('reorder error', e)
    });;
  }
}
