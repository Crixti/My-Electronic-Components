import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import {
  AddDialogComponent,
  DeleteDialogComponent,
} from '../add-dialog/add-dialog.component';
import { DatabaseService } from '../firebase/database.service';
import { FirestoreService } from '../firebase/firestore.service';
import { ElectronicComponent } from '../models';

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

  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(
    private database: DatabaseService,
    private firestore: FirestoreService,
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    this.paginator.firstPage();
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
}
