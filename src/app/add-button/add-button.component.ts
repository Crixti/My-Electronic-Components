import { Component } from '@angular/core';
import { DatabaseService, ECCategory } from '../firebase/database.service';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'add-button',
  templateUrl: './add-button.component.html',
  styleUrls: ['./add-button.component.css'],
})
export class AddButtonComponent {
  isOver = false;
  _service: DatabaseService;

  constructor(service: DatabaseService) {
    console.log('AddButton');
    this._service = service;
  }

  onClick() {
    console.log('button clicked!');
    this._service.addComponent({
      id: uuidv4(),
      position: 1,
      name: 'TC4058A',
      count: 10,
      package: 'Module',
      category: ECCategory.ADAPTER,
      description: 'Linear Li-Ion Battery Charger',
      link: 'https://datasheetspdf.com/pdf-file/997083/Linear/LTC4058-4.2/1',
    });
  }
}
