import { Component, EventEmitter, Input, Output, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatInput } from '@angular/material/input';
import { MatTableDataSource } from '@angular/material/table';
import { ECCategory, ElectronicComponent } from '../models';

export interface FilterData {
  filter: string,
  category: ECCategory,
}

@Component({
  selector: 'mfilter',
  templateUrl: './mfilter.component.html',
  styleUrls: ['./mfilter.component.scss']
})
export class MFilterComponent implements OnChanges {
  
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
  filterControl = new FormControl(undefined);

  @Output()
  public filterEvent = new EventEmitter<FilterData>();
  @Input()
  public dataSource?: MatTableDataSource<ElectronicComponent>;

  private defaultFilterPredicate: (data: any, filter: string) => boolean;

  constructor() { }

  ngOnChanges(_: SimpleChanges) {
    if (this.dataSource) {
      this.defaultFilterPredicate = this.dataSource.filterPredicate;
    }
  }

  _applyFilter() {
    const category = this.categoryControl.value;
    const filter = this.filterControl.value;
    console.log('applyFilter', category, filter);
    this.filterEvent.emit({
      category: category,
      filter: filter, 
    });
    
    this.filterDataSource(category, filter);
  }

  private filterDataSource(category, filter) {
    if (!this.dataSource) return;

    if (category) {
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        if (category != data.category) {
          return false;
        }
        return this.defaultFilterPredicate(data, filter);
      };
    } else {
      this.dataSource.filterPredicate = this.defaultFilterPredicate;
    }
    if (filter) {
      this.dataSource.filter = filter.trim().toLowerCase();
    } else {
      this.dataSource.filter = ' ';
    }

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
