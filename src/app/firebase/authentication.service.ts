import { Injectable } from '@angular/core';
import { Auth, authState, signInWithPopup, signInWithRedirect, signOut } from '@angular/fire/auth';
import { GoogleAuthProvider, User } from 'firebase/auth';
import { from, Observable } from 'rxjs';

@Injectable()
export class AuthenticationService {
  provider = new GoogleAuthProvider();
  userData: Observable<User>;

  constructor(private auth: Auth) {
    this.userData = authState(auth);
  }

  signInWithPopup(): Observable<any> {
    return from(signInWithPopup(this.auth, this.provider));
  }

  signInWithRedirect(): Observable<void> {
    return from(signInWithRedirect(this.auth, this.provider));
  }

  signOut(): Observable<void> {
    return from(signOut(this.auth));
  }

}
