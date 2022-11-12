import { Injectable } from "@angular/core";
import { Firestore, collection, collectionData, addDoc, deleteDoc } from '@angular/fire/firestore';
import { ElectronicComponent } from '../models';
import { from, map, mergeAll, Observable, of } from "rxjs";

@Injectable()
export class FirestoreService {
  collection;

  constructor(private firestore: Firestore) {
    this.collection = collection(this.firestore, 'components');
    console.log('database');
  }

  getComponents(): Observable<ElectronicComponent[]> {
    return collectionData(this.collection).pipe(
      map(components => {
        return <ElectronicComponent[]>components;
      })
    );
  }

  addComponent(component: ElectronicComponent): Observable<any> {
    return from(addDoc(this.collection, component));
  }

  addComponents(components: ElectronicComponent[]): Observable<any> {
    return of(...components).pipe(
      map(component => from(addDoc(this.collection, component))),
      mergeAll(),
    );
  }

  // deleteComponent(id: string): Observable<any> {
  //   return from(deleteDoc(this.collection, ))
  // }
}