import {
  Directive,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  Renderer2,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StatusTracker } from 'src/app/dash/interfaces/status_tracker.interface';
import {
  QtUpdateStatusV1Component,
  UpdateStatusQuotationV1,
} from '../components/modals/qt-update-status-v1/qt-update-status-v1.component';
import { QuotationPopulated } from '../interfaces/quotation.interface';
import { QuotesService } from '../services/quotes.service';

@Directive({
  selector: '[appQtStatusV1]',
})
export class QtStatusV1Directive implements OnInit, OnChanges {
  @Input() status: string = '';
  @Input() quotation_data: UpdateStatusQuotationV1 | undefined = undefined;
  @Output() emitQuotation: EventEmitter<QuotationPopulated> =
    new EventEmitter();

  quotation?: QuotationPopulated;

  currentBgColorClass: string = 'bg-light';

  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private quotesService: QuotesService,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    const element = this.elementRef.nativeElement;
    this.renderer2.addClass(element, 'badge');

    this.renderer2.addClass(element, 'fw-bold');
    this.renderer2.addClass(element, 'text-uppercase');
    this.renderer2.addClass(element, 'w-75');
    this.renderer2.addClass(element, 'py-2');
    this.renderer2.addClass(element, 'fs-6');

    this.setColorClassByStatus(this.status, element);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setColorClassByStatus(this.status);
  }

  @HostListener('click', ['$event']) onClick($event: any) {
    console.info('clicked: ' + $event);

    console.log('this.quotation_data', this.quotation_data);
    if (this.quotation_data) {
      this.openUpdateStatusDialog(this.quotation_data);
    }
  }

  setColorClassByStatus(
    status: string,
    element: ElementRef = this.elementRef.nativeElement
  ) {
    this.renderer2.removeClass(element, this.currentBgColorClass);

    let color: string = `bg-${this.getColorClassByStatus(
      this.status,
      element
    )}`;

    this.renderer2.addClass(element, color);
    this.currentBgColorClass = color;
  }

  getColorClassByStatus(status: string, element: ElementRef) {
    let color = this.quotesService.getColorByStatus(status);

    if (color === 'warning' || color === 'info' || color === 'light') {
      this.renderer2.addClass(element, 'text-dark');
      return color;
    } else {
      this.renderer2.removeClass(element, 'text-dark');
      return color;
    }
  }

  openUpdateStatusDialog(payload: UpdateStatusQuotationV1) {
    const dialogRef = this.dialog.open(QtUpdateStatusV1Component, {
      data: payload,
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('ªªªªresult', result);
      console.log('ªªªª');

      if (result) {
        console.log('detro');
        this.quotation = result;
        this.status = result.status;
        this.emitQuotationFn();
      }
    });
  }

  emitQuotationFn() {
    this.emitQuotation.emit(this.quotation);
  }
}
