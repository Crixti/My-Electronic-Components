import { trigger, state, style, transition, animate } from '@angular/animations';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, first, fromEvent, mergeMap, Subscription } from 'rxjs';
import { AddDialogComponent } from '../add-dialog/add-dialog.component';
import { DatabaseService } from '../firebase/database.service';
import { ElectronicComponent } from '../models';

@Component({
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
  animations: [
    trigger('animateVisibility', [
      state('visible', style({
        opacity: 1,
        display: 'default',
      })),
      state('hidden', style({
        opacity: 0,
        display: 'none',
      })),
      transition('* => *', [
        style({display: 'default',}),
        animate('200ms ease')
      ]),
    ]),
  ],
})
export class AddButtonComponent implements OnInit, OnDestroy {
  isOver = false;
  isHidden = false;
  private scroller: Subscription;

  constructor(private service: DatabaseService, private dialog: MatDialog) {}

  ngOnInit(): void {
    fromEvent(window, 'scroll')
      .pipe(debounceTime(100))
      .subscribe(() => this.dealWithScroll(window.scrollY));
  }

  ngOnDestroy(): void {
    this.scroller.unsubscribe();
  }

  onClick() {
    const dialogRef = this.dialog.open(AddDialogComponent, {});
    dialogRef.afterClosed().subscribe((result) => {
      console.log('add-dialog-result:', result);
      if (result) {
        this.add(result);
      }
    });
  }

  private dealWithScroll(y: number) {
    this.isHidden = y >= 100;
  }

  private add(component: ElectronicComponent) {
    this.service
      .getComponents()
      .pipe(
        first(),
        mergeMap(components => {
          var maxPosition = 0;
          if (components && components.length > 0) {
            maxPosition = Math.max(...components.map((o) => o.position));
          }
          component.position = maxPosition + 1;
          return this.service.saveComponent(component)
        })
      ).subscribe({
        next: () => console.log('add success'),
        error: (e) => console.error('add error', e)
      });
  }
}
