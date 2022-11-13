import { Component, enableProdMode } from '@angular/core';
import { User } from 'firebase/auth';
import { catchError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthenticationService } from '../firebase/authentication.service';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading = true;
  user: User = null;

  constructor(private authService: AuthenticationService) {
    console.log('app');
    if (environment.production) {
      enableProdMode();
    }

    this.isLoading = true;
    authService.userData.subscribe((user) => {
      console.log('app-user', user);
      this.user = user;
      this.isLoading = false;
    });
  }

  login() {
    this.isLoading = true;
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
    this.isLoading = true;
    this.authService.signOut().subscribe({
      next: () => console.log('sign out success'),
      error: e => console.error('sign out error', e)
    });
  }
}
