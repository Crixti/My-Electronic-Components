import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { first } from 'rxjs';
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
      if (result) {
        this.add(result);
      }
    });
  }

  private add(component) {
    this.service
      .getComponents()
      .pipe(first())
      .subscribe((components) => {
        const maxPosition = Math.max(...components.map((o) => o.position));
        component.position = maxPosition + 1;
        this.service.saveComponent(component);
      });
  }
}
