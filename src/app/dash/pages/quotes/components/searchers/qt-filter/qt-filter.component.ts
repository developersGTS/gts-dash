import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subscription } from 'rxjs';
import { StatusMessage } from 'src/app/core/interfaces/dialogs.interface';
import { DialogsService } from 'src/app/core/services/dialogs.service';
import { Company } from 'src/app/dash/pages/companys/interfaces/company.interface';
import { CompanysService } from 'src/app/dash/pages/companys/services/companys.service';
import { QuotationPopulated } from '../../../interfaces/quotation.interface';
import { PriorityList } from '../../../interfaces/quotations_service_data.interface';
import { QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'app-qt-filter',
  templateUrl: './qt-filter.component.html',
  styleUrls: ['./qt-filter.component.scss'],
})
export class QtFilterComponent implements OnInit, OnDestroy {
  priority: PriorityList[] = [];
  status: string[] = [];
  companys: Company[] = [];

  active: boolean = false;

  @Input() quotations: QuotationPopulated[] | undefined = undefined;

  quotationsFiltered: QuotationPopulated[] | undefined = [];

  @Output() emitQuotationFiltered: EventEmitter<QuotationPopulated[]> =
    new EventEmitter();

  susChangesForm: Subscription;

  filterForm = this._fb.group({
    status: [''],
    priority: [''],
    company: [''],
    sendToPayment: [false],
    materialToDelivery: [false],
    reviewFinished: [false],
    authorizedByClient: [false],
  });

  constructor(
    private dialogsService: DialogsService,
    private quotesService: QuotesService,
    private companysService: CompanysService,
    private _fb: FormBuilder
  ) {
    this.priority = this.quotesService.getPriorityList();
    this.status = this.quotesService.getStatusList();

    this.companysService.getCompanys().subscribe((result) => {
      result ? (this.companys = result) : (this.companys = []);
    });

    this.susChangesForm = this.filterForm.statusChanges.subscribe((result) => {
      this.active = true;
      this.applyFilter();
    });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.susChangesForm.unsubscribe();
  }

  emitQuotations() {
    this.emitQuotationFiltered.emit(
      this.quotationsFiltered && this.active
        ? this.quotationsFiltered
        : this.quotations
    );
  }

  applyFilter() {
    this.quotationsFiltered = [...(this.quotations || [])];

    // ======= AUTHORIZED BY CLIENT =======

    if (this.filterForm.controls['authorizedByClient'].value) {
      this.quotationsFiltered = this.quotationsFiltered.filter(
        (quotation) => quotation.customer_approved == true
      );
    }

    // ======= REVIEW FINISHED =======
    if (this.filterForm.controls['reviewFinished'].value) {
      this.quotationsFiltered = this.quotationsFiltered.filter(
        (quotation) => quotation.supervisor_approved == true
      );
    }

    // ======= SEND TO PAYMENT =======
    if (this.filterForm.controls['sendToPayment'].value) {
      this.quotationsFiltered = this.quotationsFiltered.filter(
        (quotation) => quotation.in_collection == true
      );
    }

    // ======= MATERIAL FOR DELIVERY =======
    if (this.filterForm.controls['materialToDelivery'].value) {
      this.quotationsFiltered = this.quotationsFiltered.filter(
        (quotation) => quotation.status === 'Material listo para entrega'
      );
    }

    // ======= STATUS =======
    if (this.filterForm.controls['status'].value) {
      this.quotationsFiltered = this.quotationsFiltered.filter(
        (quotation) =>
          quotation.status == this.filterForm.controls['status'].value
      );
    }

    // ======= PRIORITY =======
    if (
      this.filterForm.controls['priority'].value ||
      this.filterForm.controls['priority'].value === 0
    ) {
      this.quotationsFiltered = this.quotationsFiltered.filter(
        (quotation) =>
          quotation.priority == this.filterForm.controls['priority'].value
      );
    }

    // ======= COMPANY =======
    if (this.filterForm.controls['company'].value) {
      this.quotationsFiltered = this.quotationsFiltered.filter(
        (quotation) =>
          quotation.company._id == this.filterForm.controls['company'].value
      );
    }

    // RESULT

    this.quotationsFiltered = this.quotesService.orderQuotesByPriority(
      this.quotationsFiltered
    );

    this.dialogsService.openNotificationV1({
      message: 'Filtro de busqueda aplicado',
      status: StatusMessage.success,
    });

    this.emitQuotations();
  }

  clearFilter() {
    this.filterForm.reset();
    this.quotationsFiltered = undefined;
    this.active = false;
    this.emitQuotations();
  }
}
