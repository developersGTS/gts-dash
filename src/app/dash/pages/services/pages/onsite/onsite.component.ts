import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../../services/services.service';
import { ServicePopulated } from '../../interfaces/service.interface';

@Component({
  selector: 'app-onsite',
  templateUrl: './onsite.component.html',
  styleUrls: ['./onsite.component.scss'],
})
export class OnsiteComponent implements OnInit {
  services: ServicePopulated[] = [];

  servicesView: ServicePopulated[] = [];

  constructor(private servicesService: ServicesService) {
    this.servicesService
      .getServiceByCustom({
        performed: 'En Sitio',
        enabled: true,
      })
      .subscribe((res) => {
        res ? (this.services = this.servicesService.orderByStatus(res)) : null;
        this.servicesView = [...this.services];
      });
  }

  ngOnInit(): void {}

  applyFilter(services: ServicePopulated[]) {
    this.servicesView = services;
  }
}
