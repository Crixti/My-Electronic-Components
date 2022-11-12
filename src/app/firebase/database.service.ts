import { Injectable } from '@angular/core';
import { Database, objectVal, remove, ref, set } from '@angular/fire/database';
import { Observable, map, mergeMap, of, from, mergeAll, first } from 'rxjs';
import { ElectronicComponent } from '../models';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class DatabaseService {
  constructor(private database: Database, private authService: AuthenticationService) {
    console.log('database');
  }

  getComponents(): Observable<ElectronicComponent[]> {
    return this.authService.userData.pipe(
      mergeMap(user => {
        console.log('getComponents-user', user);
        if(user !== null) {
          return this.getComponentsForUid(user.uid);
        } else {
          return of([]);
        }
      })
    );
  }

  saveComponent(component: ElectronicComponent): Observable<void> {
    console.log('saveComponent', component);
    return this.authService.userData.pipe(
      first(),
      mergeMap(user => {
        console.log('saveComponent-user', user);
        if(user !== null) {
          return this.setComponentForUid(user.uid, component);
        } else {
          return of();
        }
      })
    );
  }

  saveComponents(components: ElectronicComponent[]): Observable<void> {
    console.log('saveComponents', components);
    return this.authService.userData.pipe(
      first(),
      mergeMap(user => {
        console.log('saveComponents2-user', user);
        if(user !== null) {
          return of(...components).pipe(
            map(component => this.setComponentForUid(user.uid, component)),
            mergeAll(),
          );
        } else {
          return of();
        }
      })
    );
  }

  deleteComponent(id: string): Observable<void> {
    return this.authService.userData.pipe(
      first(),
      mergeMap(user => {
        console.log('deleteComponent-user', user);
        if(user !== null) {
          return from(remove(this.refFor(user.uid, id)));
        } else {
          return of();
        }
      })
    );
    // set(ref(this.database, 'components/' + id), null);
  }

  private getComponentsForUid(uid: string): Observable<ElectronicComponent[]> {
    const doc = ref(this.database, uid + '/components');
    return objectVal(doc).pipe(
      map((obj) => {
        console.log('obj', obj);
        if (obj !== null) {
          return (<any>Object).entries(obj).map(([_, value]) => value);
        } else {
          return [];
        }
      })
    );
  }

  private refFor(uid: string, cid: string) {
    return ref(this.database, uid + '/components/' + cid);
  }

  private setComponentForUid(uid: string, component: ElectronicComponent): Observable<void> {
    return from(set(this.refFor(uid, component.id), component));
  }
}
