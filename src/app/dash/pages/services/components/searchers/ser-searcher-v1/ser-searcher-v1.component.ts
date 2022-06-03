import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { QuotationPopulated } from 'src/app/dash/pages/quotes/interfaces/quotation.interface';
import { ServicePopulated } from '../../../interfaces/service.interface';

@Component({
  selector: 'app-ser-searcher-v1',
  templateUrl: './ser-searcher-v1.component.html',
  styleUrls: ['./ser-searcher-v1.component.scss'],
})
export class SerSearcherV1Component implements OnInit {
  @Input() services: ServicePopulated[] = [];

  @Output() emitServicesFiltered: EventEmitter<ServicePopulated[]> =
    new EventEmitter();

  active: boolean = false;

  servicesFiltered: ServicePopulated[] = [];

  constructor() {}

  searchControl = new FormControl();
  options: string[] = [];
  filteredOptions?: Observable<string[]>;

  ngOnInit() {
    // this.filteredOptions = this.searchControl.valueChanges.pipe(
    //   startWith(''),
    //   map(value => this._filter(value)),
    // );

    this.searchControl.statusChanges.subscribe((result) => {
      this.active = true;
      this.filterData(this.searchControl.value);
    });
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
  }

  emitQuotations() {
    this.emitServicesFiltered.emit(this.servicesFiltered);
  }

  filterData(key: string) {
    this.servicesFiltered = this.services.filter((service) =>
      this.validateKeySearch(service, key)
    );
    console.log('quotationsFiltered', this.servicesFiltered);
    this.emitQuotations();
  }

  validateKeySearch(service: ServicePopulated, key: string): boolean {
    key = key.toLowerCase();

    // BUSCAR EN DESCRIPCION GENERAL
    if (service.general_description.toLowerCase().includes(key)) {
      return true;
    }

    // BUSCAR EN DESCRIPCION PROBLEM
    if (
      service.problem_description &&
      service.problem_description.toLowerCase().includes(key)
    ) {
      return true;
    }

    // BUSCAR EN DESCRIPCION DIAGNOSTIC
    if (service.diagnostic && service.diagnostic.toLowerCase().includes(key)) {
      return true;
    }

    // BUSCAR EN DESCRIPCION REPAIR
    if (
      service.repair_description &&
      service.repair_description.toLowerCase().includes(key)
    ) {
      return true;
    }

    // BUSCAR EN FOLIO ORDS
    if (service.service_order && service.service_order.includes(key)) {
      return true;
    }

    // BUSCAR EN CLIENTE
    if (service.company.nickname.toLowerCase().includes(key)) {
      return true;
    }

    // BUSCAR EN CONTACTO
    if (service.contact.name.toLowerCase().includes(key)) {
      return true;
    }

    // BUSQUEDA POR EQUIPO
    if (service.equipment) {
      // NO SERIE DEL EQUIPO
      if (service.equipment.serial_no.toLowerCase().includes(key)) {
        return true;
      }

      // EQUIPO
      if (service.equipment.equipment.toLowerCase().includes(key)) {
        return true;
      }

      // BRAND
      if (
        service.equipment.brand &&
        service.equipment.brand.toLowerCase().includes(key)
      ) {
        return true;
      }

      // MODEL
      if (
        service.equipment.model &&
        service.equipment.model.toLowerCase().includes(key)
      ) {
        return true;
      }

      // PRODUCT NO
      if (
        service.equipment.product_no &&
        service.equipment.product_no.toLowerCase().includes(key)
      ) {
        return true;
      }
    }

    return false;
  }

  cleanFilter() {
    this.emitServicesFiltered.emit(this.services);
    this.searchControl.reset();
    this.active = false;
  }
}
