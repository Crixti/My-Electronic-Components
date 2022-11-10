import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AutocompleteHandler } from '../autocomplete';
import { ECCategory, ElectronicComponent } from '../firebase/database.service';
import { combineLatestWith } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit {
  title = 'Add Component';
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

  private uuid = uuidv4();
  private position = 0;
  nameControl = new FormControl('', [Validators.required]);
  countControl = new FormControl(1);
  packageControl = new FormControl('');
  categoryControl = new FormControl(undefined, [Validators.required]);
  descriptionControl = new FormControl('');
  linkControl = new FormControl('');
  // controls = new Map<string, FormControl>([
  //   ['name', new FormControl('', [Validators.required])],
  //   ['category', new FormControl('', [Validators.required])],
  //   ['package', new FormControl('')],
  // ]);
  yesEnabled = false;

  packageAutocomplete = new AutocompleteHandler(
    [
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
    ],
    this.packageControl
  );

  constructor(
    public dialogRef: MatDialogRef<AddDialogComponent>,
    @Inject(MAT_DIALOG_DATA) component: ElectronicComponent
  ) {
    if (component) {
      this.title = 'Edit Component';

      this.uuid = component.id;
      this.position = component.position;
      this.nameControl.setValue(component.name);
      this.countControl.setValue(component.count);
      this.packageControl.setValue(component.package);
      this.categoryControl.setValue(component.category);
      this.descriptionControl.setValue(component.description);
      this.linkControl.setValue(component.link);
      // } else {
      // this.title = 'Add Component';
      // component = {
      //   id: this.uuid,
      //   position: this.position,
      //   name: this.nameControl.value,
      //   count: this.countControl.value,
      //   package: this.packageControl.value,
      //   category: this.categoryControl.value,
      //   description: this.descriptionControl.value,
      //   link: this.linkControl.value,
      // };
    }

    // Object.keys(component).forEach((key) => {
    //   const value = component[key];
    //   console.log('controls: ', key, this.controls.has(key));
    //   if (this.controls.has(key)) {
    //     this.controls.get(key).setValue(value);
    //   } else {
    //     this.controls[key] = new FormControl(value);
    //   }
    // });
    // console.log('controls', this.controls);
  }

  ngOnInit() {
    this.packageAutocomplete.init();
    this.nameControl.statusChanges
      .pipe(combineLatestWith(this.categoryControl.statusChanges))
      .subscribe(([a, b]) => {
        console.log('status', a, b);
        this.yesEnabled = !this.hasError();
      });

    this.nameControl.updateValueAndValidity();
    this.categoryControl.updateValueAndValidity();
  }

  onYesClick(): void {
    if (this.hasError()) {
      return;
    }

    this.dialogRef.close({
      id: this.uuid,
      position: this.position,
      name: this.nameControl.value,
      count: this.countControl.value,
      package: this.packageControl.value,
      category: this.categoryControl.value,
      description: this.descriptionControl.value,
      link: this.linkControl.value,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  private hasError() {
    return this.nameControl.invalid || this.categoryControl.invalid;
  }
}

@Component({
  selector: 'delete-dialog',
  template: `
    <mat-dialog-content>
      Are you sure you want to delete this component?
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close="false">No</button>
      <button mat-button mat-dialog-close="true">Yes</button>
    </mat-dialog-actions>
  `,
})
export class DeleteDialogComponent {}
