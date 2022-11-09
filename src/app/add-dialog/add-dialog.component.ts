import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ECCategory, ElectronicComponent } from '../firebase/database.service';
import { v4 as uuidv4 } from 'uuid';
import { AutocompleteHandler } from '../autocomplete';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit {
  title = 'Edit Component';
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

  packageAutocomplete = new AutocompleteHandler([
    'SIP',
    'DIP',
    'CDIP',
    'QIP',
    'SOP',
    'TO-3',
    'TO-5',
    'TO-18',
    'TO-39',
    'TO-46',
    'TO-66',
    'TO-92',
    'TO-99',
    'TO-100',
    'TO-126',
    'TO-220',
    'TO-226',
    'TO-247',
    'TO-251',
    'TO-252',
    'TO-262',
    'TO-263',
    'TO-274',
  ]);

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public component: ElectronicComponent
  ) {
    if (component) {
      console.log('component:', component);
    } else {
      this.title = 'Add Component';
      console.log('no component');
      this.component = {
        id: uuidv4(),
        position: 1,
        name: '',
        count: 1,
        package: '',
        category: undefined,
        description: '',
        link: '',
      };
    }
  }

  onYesClick(): void {
    this.dialogRef.close(this.component);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    this.packageAutocomplete.init();
  }
}
