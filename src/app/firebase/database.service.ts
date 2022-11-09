import { Injectable } from '@angular/core';
import { Database, objectVal, list, ref, set } from '@angular/fire/database';
import { Observable, map } from 'rxjs';

export enum ECCategory {
  ADAPTER = 'Adapter',
  ADC = 'ADC',
  CONNECTOR = 'Connector',
  EEPROM = 'EEPROM',
  IC = 'IC',
  MICROCONTROLLER = 'Microcontroller',
  MISC = 'Misc',
  MODULE = 'Module',
  PASSIVE = 'Passive Component',
  REGULATOR = 'Regulator',
  REGULATOR_IC = 'Regulator IC',
  SENSOR = 'Sensor',
  TRANSISTOR = 'Transistor',
}

export interface ElectronicComponent {
  id: string;
  position: number;
  name: string;
  count: number;
  package: string;
  category: ECCategory;
  description: string;
  link: string;
}

@Injectable()
export class DatabaseService {
  constructor(private database: Database) {
    console.log('database: ' + database);
  }

  getComponents(): Observable<ElectronicComponent[]> {
    const doc = ref(this.database, 'components');
    const listVal = objectVal(doc).pipe(
      map((obj) => {
        return (<any>Object).entries(obj).map(([_, value]) => value);
      })
    );

    return listVal;
  }

  addComponent(component: ElectronicComponent) {
    set(ref(this.database, 'components/' + component.id), component);
  }

  addComponents(components: ElectronicComponent[]) {
    components.forEach((component) => {
      set(ref(this.database, 'components/' + component.id), component);
    });
  }
}
