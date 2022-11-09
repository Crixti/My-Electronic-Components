import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, SortDirection } from '@angular/material/sort';
import {
  DatabaseService,
  ElectronicComponent,
} from '../firebase/database.service';

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
  ];
  dataSource = new MatTableDataSource<ElectronicComponent>();

  isLoadingResults = true;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(service: DatabaseService) {
    console.log('aaa');
    service.getComponents().subscribe((list) => {
      console.log('on list: ', list);
      this.isLoadingResults = false;
      this.dataSource.data = list.sort((a, b) => a.position - b.position);
    });
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
}
