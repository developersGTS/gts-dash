import { Component, OnInit } from '@angular/core';
import { ServicePopulated } from '../../../interfaces/service.interface';
import { ServicesService } from '../../../services/services.service';

@Component({
  selector: 'app-ser-select-service-by-filter-v1',
  templateUrl: './ser-select-service-by-filter-v1.component.html',
  styleUrls: ['./ser-select-service-by-filter-v1.component.scss'],
})
export class SerSelectServiceByFilterV1Component implements OnInit {
  services: ServicePopulated[] = [];

  servicesView: ServicePopulated[] = [];

  service_selected: ServicePopulated | undefined = undefined;

  constructor(private servicesService: ServicesService) {}

  ngOnInit(): void {
    this.servicesService
      .getServiceByCustom({
        enabled: true,
      })
      .subscribe((res) => {
        if (res && res.length > 0) {
          this.services = res;
          this.servicesView = [...this.services];
        } else {
          this.services = [];
        }
      });
  }

  select_service(service_id: string) {
    console.log('select_service');
    let arrayFilter = this.services.filter(
      (service) => service._id === service_id
    );

    arrayFilter.length > 0
      ? (this.service_selected = arrayFilter[0])
      : (this.service_selected = undefined);
  }

  clear_service() {
    this.service_selected = undefined;
  }

  applyFilter(services: ServicePopulated[]) {
    this.servicesView = services;
  }
}
