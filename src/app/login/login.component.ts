import { Component } from '@angular/core';
import { AuthenticationService } from '../firebase/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {

  constructor(private authService: AuthenticationService) {
    console.log('login');
    authService.signInWithRedirect();
  }
}
