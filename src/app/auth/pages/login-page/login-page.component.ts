import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent {

  constructor (private authService : AuthService,
  private router : Router  
  ) {}


  login () {
    this.authService.login('epala@arepa.com', '213453')
    .subscribe(user => {
      this.router.navigateByUrl('/')
    })
  }
}
