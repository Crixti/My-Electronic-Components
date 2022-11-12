import { Component } from '@angular/core';
import { User } from 'firebase/auth';
import { catchError } from 'rxjs';
import { AuthenticationService } from '../firebase/authentication.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  user: User = null;

  constructor(private authService: AuthenticationService) {
    console.log('app')
    authService.userData.subscribe((user) => {
      console.log('user', user);
      this.user = user;
    });
  }

  login() {
    this.authService.signInWithPopup().pipe(
      catchError(e => { 
        console.error('signInWithPopup-error', e);
        return this.authService.signInWithRedirect();
      })
    ).subscribe({
      next: () => console.log('sign in success'),
      error: e => console.error('sign in error', e)
    });
  }

  logout() {
    this.authService.signOut().subscribe({
      next: () => console.log('sign out success'),
      error: e => console.error('sign out error', e)
    });
  }
}
