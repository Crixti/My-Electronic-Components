import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ECCategory, ElectronicComponent } from '../firebase/database.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent {
  title = 'Edit Component';

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
        category: ECCategory.MISC,
        description: '',
        link: '',
      };
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
