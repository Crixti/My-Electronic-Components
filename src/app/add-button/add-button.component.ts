import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DatabaseService } from '../firebase/database.service';

@Component({
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
})
export class AddButtonComponent {
  isOver = false;

  constructor(private service: DatabaseService, private dialog: MatDialog) {}

  onClick() {
    const dialogRef = this.dialog.open(AddDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      console.log('result:', result);
    });
    // console.log('button clicked!');
    // this.service.addComponent({
    //   id: uuidv4(),
    //   position: 1,
    //   name: 'TC4058A',
    //   count: 10,
    //   package: 'Module',
    //   category: ECCategory.ADAPTER,
    //   description: 'Linear Li-Ion Battery Charger',
    //   link: 'https://datasheetspdf.com/pdf-file/997083/Linear/LTC4058-4.2/1',
    // });
  }
}
