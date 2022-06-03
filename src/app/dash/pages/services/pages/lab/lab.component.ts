import { Component, OnInit } from '@angular/core';
import { ServicePopulated } from '../../interfaces/service.interface';
import { ServicesService } from '../../services/services.service';

@Component({
  selector: 'app-lab',
  templateUrl: './lab.component.html',
  styleUrls: ['./lab.component.scss'],
})
export class LabComponent implements OnInit {
  services: ServicePopulated[] = [];

  servicesView: ServicePopulated[] = [];

  constructor(private servicesService: ServicesService) {
    this.servicesService
      .getServiceByCustom({
        performed: 'En Laboratorio',
        enabled: true,
      })
      .subscribe((res) => {
        res ? (this.services = this.servicesService.orderByStatus(res)) : null;
        this.servicesView = [ ... this.services];
      });
  }

  ngOnInit(): void {}

  applyFilter(services: ServicePopulated[]) {
    this.servicesView = services;
  }
}
