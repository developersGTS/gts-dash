import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquipmentsService } from '../equipments/services/equipments.service';
import { ServicesService } from './services/services.service';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
})
export class ServicesComponent implements OnInit {
  navLinks: any[];
  activeLinkIndex = -1;

  constructor(
    private router: Router,
    private servicesService: ServicesService,
    private equipmentsService: EquipmentsService
  ) {
    this.navLinks = [
      {
        label: 'Dashboard',
        link: './',
        index: 0,
      },
      {
        label: 'Mis Asignados',
        link: './assigned',
        index: 1,
      },
      {
        label: 'Servicios',
        link: './onsite',
        index: 2,
      },
      {
        label: 'Lab',
        link: './lab',
        index: 3,
      },
      {
        label: 'Pendientes',
        link: './pending',
        index: 4,
      },
    ];
  }

  ngOnInit(): void {
    this.router.events.subscribe((res) => {
      this.activeLinkIndex = this.navLinks.indexOf(
        this.navLinks.find((tab) => tab.link === '.' + this.router.url)
      );
    });
  }

  addNewService() {
    this.servicesService.openServiceAdd();
  }
}
