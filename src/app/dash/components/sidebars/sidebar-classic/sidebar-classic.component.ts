import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar-classic',
  templateUrl: './sidebar-classic.component.html',
  styleUrls: ['./sidebar-classic.component.scss'],
})
export class SidebarClassicComponent implements OnInit {
  @Output() toggle_out = new EventEmitter<string>();

  count_not: number = 0;

  menu: any[] = [
    {
      title: 'Inicio',
      section: 'home',
      url: '/dash/home',
      icon: 'home',
    },
    {
      title: 'Cotizaciones',
      section: 'home',
      url: '/dash/quotes',
      icon: 'description',
    },
    {
      title: 'Cobranza',
      section: 'home',
      url: '/dash/collection',
      icon: 'paid',
    },
    {
      title: 'Servicios',
      section: 'home',
      url: '/dash/services/onsite',
      icon: 'construction',
    },
    {
      title: 'Laboratorio',
      section: 'home',
      url: '/dash/services/lab',
      icon: 'store',
    },
    {
      title: 'Equipos',
      section: 'home',
      url: '/dash/equipments',
      icon: 'desktop_windows',
    },
  ];
  admin: any[] = [];
  cuenta: any[] = [
    {
      title: 'Perfil',
      section: 'account',
      url: '/dash/account',
      icon: 'person',
    },
    {
      title: 'Ayuda',
      section: 'account',
      url: '/dash/support',
      icon: 'support_agent',
    },
  ];

  constructor(private router: Router) {}

  ngOnInit(): void {}

  toggle() {
    this.toggle_out.emit('toggle');
  }

  logOut() {
    // TODO: LOG OUT
    // this.AccountService.logout();
    this.router.navigateByUrl('/auth/login');
  }

  get nickname() {
    return localStorage.getItem('jmc-nickname') || 'Welcome!';
  }

  get mail() {
    return localStorage.getItem('jmc-mail') || '';
  }
}
