import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/auth/interfaces/user.interface';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styleUrls: ['./layout-page.component.css']
})
export class LayoutPageComponent {
  constructor (private authService : AuthService,  private router : Router) {}
  public sidebarItems = [
    {
      label: 'Listado',
      icon: 'label',
      url: './list'
    },
    {
      label: 'Añadir',
      icon: 'add',
      url: './new-hero'
    },
    {
      label: 'buscar',
      icon: 'search',
      url: './search'
    },
  ]

  get user(): IUser |undefined {
    return this.authService.currentUser;
  }

  onLogout () {
    this.authService.logout();
    this.router.navigateByUrl('auth')
  }
}
