import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { QuotationPopulated } from '../../../interfaces/quotation.interface';

@Component({
  selector: 'app-qt-searcher-v1',
  templateUrl: './qt-searcher-v1.component.html',
  styleUrls: ['./qt-searcher-v1.component.scss'],
})
export class QtSearcherV1Component implements OnInit {
  @Input() quotations: QuotationPopulated[] = [];

  @Output() emitQuotationsFiltered: EventEmitter<QuotationPopulated[]> =
    new EventEmitter();

  active: boolean = false;

  quotationsFiltered: QuotationPopulated[] = [];

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
    this.emitQuotationsFiltered.emit(this.quotationsFiltered);
  }

  filterData(key: string) {
    this.quotationsFiltered = this.quotations.filter((quotation) =>
      this.validateKeySearch(quotation, key)
    );
    console.log('quotationsFiltered', this.quotationsFiltered);
    this.emitQuotations();
  }

  validateKeySearch(quotation: QuotationPopulated, key: string): boolean {
    let match = false;
    key = key.toLowerCase();

    // BUSCAR EN DESCRIPCION
    if (quotation.description.toLowerCase().includes(key)) {
      return true;
    }

    // BUSCAR EN FOLIO
    let folio = quotation.quotation_no ? quotation.quotation_no + '' : '';
    if (folio.includes(key)) {
      return true;
    }

    // BUSCAR EN CLIENTE
    if (quotation.company.nickname.toLowerCase().includes(key)) {
      return true;
    }

    // BUSCAR EN CONTACTO
    if (quotation.contact.name.toLowerCase().includes(key)) {
      return true;
    }

    // BUSCAR EN SERVICIO
    if (quotation.service) {
      // DESCRIPCION DEL SERVICIO
      if (quotation.service.general_description.toLowerCase().includes(key)) {
        return true;
      }

      // NO SERIE DEL EQUIPO
      if (quotation.service.equipment) {
        if (quotation.service.equipment.serial_no.toLowerCase().includes(key)) {
          return true;
        }
      }
    }

    // BUSCAR EN QUOTATION ITEMS
    if (quotation.quotation_items && quotation.quotation_items.length > 0) {
      for (let item of quotation.quotation_items) {
        // DESCRIPCION DEL ITEM
        if (item.description.toLowerCase().includes(key)) {
          return true;
        }

        // NUMERO DE PARTE DEL ITEM
        if (item.part_no) {
          if (item.part_no.toLowerCase().includes(key)) {
            return true;
          }
        }
      }
    }

    return match;
  }

  cleanFilter() {
    this.emitQuotationsFiltered.emit(this.quotations);
    this.searchControl.reset();
    this.active = false;
  }
}
