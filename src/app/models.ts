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
