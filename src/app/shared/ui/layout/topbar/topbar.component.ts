import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { CommonModule } from '@angular/common';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';
import { AuthService } from '../../../../auth/data-access/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [
    MenubarModule,
    BadgeModule,
    ButtonModule,
    MenuModule,
    InputTextModule,
    RippleModule,
    CommonModule,
  ],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss',
})
export class TopbarComponent implements OnInit {
  items: MenuItem[] | undefined;
  userItems: MenuItem[] | undefined;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Inicio',
        icon: 'pi pi-home',
        routerLink: '/',
      },
      {
        label: 'Configuración',
        icon: 'pi pi-cog',
        routerLink: '/settings',
      },
      {
        label: 'Github',
        icon: 'pi pi-github',
        url: 'https://github.com/juanploaizan/sms-builder-frontend',
      },
    ];

    this.userItems = [
      {
        label: 'Usuario',
        items: [
          { label: 'Perfil', icon: 'pi pi-user' },
          { label: 'Configuración', icon: 'pi pi-cog' },
          {
            label: 'Salir',
            icon: 'pi pi-sign-out',
            command: () => this.logout(),
          },
        ],
      },
    ];
  }

  logout() {
    this.authService.logout();
  }
}
