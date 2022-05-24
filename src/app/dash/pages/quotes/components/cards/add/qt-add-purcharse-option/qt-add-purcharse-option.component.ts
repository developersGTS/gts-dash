import { formatNumber } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { PurcharseOption } from '../../../../interfaces/purcharse_option.interface';

@Component({
  selector: 'app-qt-add-purcharse-option',
  templateUrl: './qt-add-purcharse-option.component.html',
  styleUrls: ['./qt-add-purcharse-option.component.scss'],
})
export class QtAddPurcharseOptionComponent implements OnInit, OnDestroy {
  @Input() profit_client: number = 0.8;

  autocalcular: boolean = true;

  // SUSCRIPTIONS -- REACTIVE FORM
  susAcquisition_price?: Subscription;
  susDelivery_cost?: Subscription;
  susProfit?: Subscription;
  susProfit_percent?: Subscription;

  susImport?: Subscription;

  susImp_tax?: Subscription;
  susImp_tax_percent?: Subscription;
  susImp_import?: Subscription;
  susImp_import_percent?: Subscription;
  susImp_iva?: Subscription;
  susImp_iva_percent?: Subscription;
  susSubtotal?: Subscription;

  // FORM
  formPurcharseOption: FormGroup = this._formBuilder.group({
    country: ['Mexico', Validators.required],
    supplier: ['', Validators.required],
    description: [''],
    condition: ['Nuevo', Validators.required],
    link: [''],
    tel: [''],
    cant_available: [1, [Validators.min(0)]],
    delivery_time: [1, [Validators.required, Validators.min(1)]],
    delivery_cost: [0, [Validators.required, Validators.min(0)]],
    acquisition_price: [0, [Validators.required, Validators.min(0)]],
    profit_percent: [
      0.8,
      [Validators.required, Validators.min(0), Validators.max(1)],
    ],
    profit: [0, [Validators.required, Validators.min(0)]],
    import: [false, Validators.required],

    // ================== IMPORT DATA ==================
    // Se agrega el prefijo imp_ a los nombres de controles para evitar conflicto dentro del mismo form
    imp_tax_percent: [0.08],
    imp_tax: [0],
    imp_import_percent: [0.11],
    imp_import: [0],
    imp_iva_percent: [0.16],
    imp_iva: [0],
    imp_other_cost: [0],
    // ================== END IMPORT DATA ==================

    invoice: [true, Validators.required],
    iva_percent: [0.16, [Validators.required, Validators.min(0)]],
    iva: [0, [Validators.required, Validators.min(0)]],
    subtotal: [0, [Validators.required, Validators.min(0)]],
    total: [0, [Validators.required, Validators.min(0)]],
    best_option: [false, Validators.required],
    available: [true, Validators.required],
  });

  constructor(
    public dialogRef: MatDialogRef<QtAddPurcharseOptionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PurcharseOption,
    private _formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    if (typeof this.data == 'number') {
      this.profit_client = this.data;
      console.log('profit updated', this.profit_client);
    }

    console.log('add prucharse option component: profit', this.profit_client);

    // SI EXISTE LA PROPIEDAD 'PROFIT PERCENT' EN LA DATA DEL DIALOGO LA ASIGNA
    // SI NO EXISTA LA DATA DEL DIALOGO INSERTA EL VALOR DEL @INPUT profit_client
    this.data && this.data.profit_percent
      ? this.formPurcharseOption.controls['profit_percent'].setValue(
          this.data.profit_percent
        )
      : this.formPurcharseOption.controls['profit_percent'].setValue(
          this.profit_client
        );

    if (this.data && this.data.description) {
      // AUTOCALCULATE OFF
      this.autocalcular = false;

      this.data.country
        ? this.formPurcharseOption.controls['country'].setValue(
            this.data.country
          )
        : null;
      this.data.supplier
        ? this.formPurcharseOption.controls['supplier'].setValue(
            this.data.supplier
          )
        : null;
      this.data.description
        ? this.formPurcharseOption.controls['description'].setValue(
            this.data.description
          )
        : null;
      this.data.condition
        ? this.formPurcharseOption.controls['condition'].setValue(
            this.data.condition
          )
        : null;
      this.data.link
        ? this.formPurcharseOption.controls['link'].setValue(this.data.link)
        : null;
      this.data.tel
        ? this.formPurcharseOption.controls['tel'].setValue(this.data.tel)
        : null;
      this.data.cant_available
        ? this.formPurcharseOption.controls['cant_available'].setValue(
            this.data.cant_available
          )
        : null;
      this.data.delivery_time
        ? this.formPurcharseOption.controls['delivery_time'].setValue(
            this.data.delivery_time
          )
        : null;
      this.data.delivery_cost
        ? this.formPurcharseOption.controls['delivery_cost'].setValue(
            this.data.delivery_cost
          )
        : null;
      this.data.acquisition_price
        ? this.formPurcharseOption.controls['acquisition_price'].setValue(
            this.data.acquisition_price
          )
        : null;
      this.data.profit_percent
        ? this.formPurcharseOption.controls['profit_percent'].setValue(
            this.data.profit_percent
          )
        : null;
      this.data.profit
        ? this.formPurcharseOption.controls['profit'].setValue(this.data.profit)
        : null;
      this.data.import
        ? this.formPurcharseOption.controls['import'].setValue(this.data.import)
        : null;

      if (this.data.import_data) {
        this.data.import_data.tax_percent
          ? this.formPurcharseOption.controls['imp_tax_percent'].setValue(
              this.data.import_data.tax_percent
            )
          : null;
        this.data.import_data.tax
          ? this.formPurcharseOption.controls['imp_tax'].setValue(
              this.data.import_data.tax
            )
          : null;
        this.data.import_data.import_percent
          ? this.formPurcharseOption.controls['imp_import_percent'].setValue(
              this.data.import_data.import_percent
            )
          : null;
        this.data.import_data.import
          ? this.formPurcharseOption.controls['imp_import'].setValue(
              this.data.import_data.import
            )
          : null;
        this.data.import_data.iva_percent
          ? this.formPurcharseOption.controls['imp_iva_percent'].setValue(
              this.data.import_data.iva_percent
            )
          : null;
        this.data.import_data.iva
          ? this.formPurcharseOption.controls['imp_iva'].setValue(
              this.data.import_data.iva
            )
          : null;
        this.data.import_data.other_cost
          ? this.formPurcharseOption.controls['imp_other_cost'].setValue(
              this.data.import_data.other_cost
            )
          : null;
      }

      this.data.invoice
        ? this.formPurcharseOption.controls['invoice'].setValue(
            this.data.invoice
          )
        : null;
      this.data.iva_percent
        ? this.formPurcharseOption.controls['iva_percent'].setValue(
            this.data.iva_percent
          )
        : null;
      this.data.iva
        ? this.formPurcharseOption.controls['iva'].setValue(this.data.iva)
        : null;
      this.data.subtotal
        ? this.formPurcharseOption.controls['subtotal'].setValue(
            this.data.subtotal
          )
        : null;
      this.data.total
        ? this.formPurcharseOption.controls['total'].setValue(this.data.total)
        : null;
      this.data.best_option
        ? this.formPurcharseOption.controls['best_option'].setValue(
            this.data.best_option
          )
        : null;
      this.data.available
        ? this.formPurcharseOption.controls['available'].setValue(
            this.data.available
          )
        : null;
    }

    // ACQUISITION SUSCRIPTION
    this.susAcquisition_price = this.formPurcharseOption.controls[
      'acquisition_price'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calcularGanacia() : null;
    });

    // DELIVERY SUSCRIPTION
    this.susDelivery_cost = this.formPurcharseOption.controls[
      'delivery_cost'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calcularGanacia() : null;
    });

    // PROFIT SUSCRIPTION
    this.susProfit = this.formPurcharseOption.controls[
      'profit'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calculateTotal() : null;
    });

    // PROFIT PERCENT SUSCRIPTION
    this.susProfit_percent = this.formPurcharseOption.controls[
      'profit_percent'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calcularGanacia() : null;
    });

    // TAX SUSCRIPTION
    this.susImp_tax = this.formPurcharseOption.controls[
      'imp_tax'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calcularImportacion('import') : null;
    });

    // TAX PERCENT SUSCRIPTION
    this.susImp_tax_percent = this.formPurcharseOption.controls[
      'imp_tax_percent'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calcularImportacion() : null;
    });

    // IMPORT SUSCRIPTION
    this.susImp_import = this.formPurcharseOption.controls[
      'imp_import'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calcularImportacion('iva') : null;
    });

    // IMPORT PERCENT SUSCRIPTION
    this.susImp_import_percent = this.formPurcharseOption.controls[
      'imp_import_percent'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calcularImportacion('import') : null;
    });

    // IMP IVA SUSCRIPTION
    this.susImp_iva = this.formPurcharseOption.controls[
      'imp_iva'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calculateTotal() : null;
    });

    // IMP IVA PERCENT SUSCRIPTION
    this.susImp_iva_percent = this.formPurcharseOption.controls[
      'imp_iva_percent'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calcularImportacion('iva') : null;
    });

    // IMPORT SUSCRIPTION
    this.susImport = this.formPurcharseOption.controls[
      'import'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.disableImport() : null;
    });

    // SUBTOTAL SUSCRIPTION
    this.susSubtotal = this.formPurcharseOption.controls[
      'subtotal'
    ].statusChanges.subscribe((res) => {
      this.autocalcular ? this.calcularTotalBySubtotal() : null;
    });
  }

  ngOnDestroy(): void {
    this.susAcquisition_price?.unsubscribe();
    this.susDelivery_cost?.unsubscribe();

    this.susImp_import?.unsubscribe();
    this.susImp_import_percent?.unsubscribe();
    this.susImp_iva?.unsubscribe();
    this.susImp_iva_percent?.unsubscribe();
    this.susImp_tax?.unsubscribe();
    this.susImp_tax_percent?.unsubscribe();

    this.susProfit?.unsubscribe();
    this.susProfit_percent?.unsubscribe();

    this.susSubtotal?.unsubscribe();
  }

  addPurcharseOption() {
    this.formPurcharseOption.markAllAsTouched();

    if (this.formPurcharseOption.valid) {
      this.dialogRef.close(this.getData());
    }
  }

  getData() {
    let option: PurcharseOption = {
      country: this.formPurcharseOption.controls['country'].value,
      supplier: this.formPurcharseOption.controls['supplier'].value,
      description: this.formPurcharseOption.controls['description'].value,
      condition: this.formPurcharseOption.controls['condition'].value,
      link: this.formPurcharseOption.controls['link'].value,
      tel: this.formPurcharseOption.controls['tel'].value,
      cant_available: this.formPurcharseOption.controls['cant_available'].value,
      delivery_time: this.formPurcharseOption.controls['delivery_time'].value,
      delivery_cost: this.formPurcharseOption.controls['delivery_cost'].value,
      acquisition_price:
        this.formPurcharseOption.controls['acquisition_price'].value,
      profit_percent: this.formPurcharseOption.controls['profit_percent'].value,
      profit: this.formPurcharseOption.controls['profit'].value,
      import: this.formPurcharseOption.controls['import'].value,

      // ================== IMPORT DATA ==================
      import_data: {
        tax_percent: this.formPurcharseOption.controls['imp_tax_percent'].value,
        tax: this.formPurcharseOption.controls['imp_tax'].value,
        import_percent:
          this.formPurcharseOption.controls['imp_import_percent'].value,
        import: this.formPurcharseOption.controls['imp_import'].value,
        iva_percent: this.formPurcharseOption.controls['imp_iva_percent'].value,
        iva: this.formPurcharseOption.controls['imp_iva'].value,
        other_cost: this.formPurcharseOption.controls['imp_other_cost'].value,
      },
      // ================== END IMPORT DATA ==================

      invoice: this.formPurcharseOption.controls['invoice'].value,
      iva_percent: this.formPurcharseOption.controls['iva_percent'].value,
      iva: this.formPurcharseOption.controls['iva'].value,
      subtotal: this.formPurcharseOption.controls['subtotal'].value,
      total: this.formPurcharseOption.controls['total'].value,
      best_option: this.formPurcharseOption.controls['best_option'].value,
      available: this.formPurcharseOption.controls['available'].value,
    };

    console.log('option -- ', option);

    return option;
  }

  calculateTotal() {
    // SUBTOTAL
    let subtotal: number =
      this.formPurcharseOption.controls['acquisition_price'].value +
      this.formPurcharseOption.controls['delivery_cost'].value +
      this.formPurcharseOption.controls['profit'].value +
      this.formPurcharseOption.controls['imp_tax'].value +
      this.formPurcharseOption.controls['imp_import'].value +
      this.formPurcharseOption.controls['imp_iva'].value;

    this.formPurcharseOption.controls['subtotal'].setValue(
      this.formatDecimal(subtotal)
    );

    // IVA
    let iva: number =
      this.formPurcharseOption.controls['subtotal'].value *
      this.formPurcharseOption.controls['iva_percent'].value;

    this.formPurcharseOption.controls['iva'].setValue(this.formatDecimal(iva));

    // TOTAL
    let total: number =
      Number(this.formPurcharseOption.controls['subtotal'].value) +
      Number(this.formPurcharseOption.controls['iva'].value);

    this.formPurcharseOption.controls['total'].setValue(
      this.formatDecimal(total)
    );
  }

  calcularGanacia() {
    let ganacia: number =
      (Number(this.formPurcharseOption.controls['acquisition_price'].value) +
        Number(this.formPurcharseOption.controls['delivery_cost'].value)) /
      this.formPurcharseOption.controls['profit_percent'].value;

    ganacia =
      ganacia - this.formPurcharseOption.controls['acquisition_price'].value;

    this.formPurcharseOption.controls['profit'].setValue(
      this.formatDecimal(ganacia)
    );

    // SI LA IMPORTACION ESTA ACTIVADA SE CALCULA
    this.formPurcharseOption.controls['import'].value
      ? this.calcularImportacion()
      : null;

    // CALCULAR TOTAL
    this.calculateTotal();
  }

  calcularImportacion(step: string = 'tax') {
    if (step == 'tax') {
      // CALCULANDO TAX
      let tax: number =
        this.formPurcharseOption.controls['acquisition_price'].value *
        this.formPurcharseOption.controls['imp_tax_percent'].value;

      this.formPurcharseOption.controls['imp_tax'].setValue(tax);
    }

    if (step == 'import' || step == 'tax') {
      // CALCULANDO IMPORTACION
      let imp: number =
        (this.formPurcharseOption.controls['acquisition_price'].value +
          this.formPurcharseOption.controls['imp_tax'].value) *
        this.formPurcharseOption.controls['imp_import_percent'].value;

      this.formPurcharseOption.controls['imp_import'].setValue(imp);
      // caution: break is omitted intentionally
    }

    if (step == 'iva' || step == 'tax' || step == 'import') {
      // CALCULANDO IVA DE IMPORTACION
      let iva: number =
        (this.formPurcharseOption.controls['acquisition_price'].value +
          this.formPurcharseOption.controls['imp_tax'].value +
          this.formPurcharseOption.controls['imp_import'].value) *
        this.formPurcharseOption.controls['imp_iva_percent'].value;

      this.formPurcharseOption.controls['imp_iva'].setValue(iva);
    }

    // CALCULAR TOTAL
    this.calculateTotal();
  }

  calcularTotalBySubtotal() {
    this.formPurcharseOption.controls['iva'].setValue(
      this.formPurcharseOption.controls['subtotal'].value * 0.16
    );
    this.formPurcharseOption.controls['total'].setValue(
      this.formPurcharseOption.controls['subtotal'].value * 1.16
    );
  }

  disableImport() {
    let status: boolean = this.formPurcharseOption.controls['import'].value;

    if (!status) {
      this.formPurcharseOption.controls['imp_tax'].setValue(0);
      this.formPurcharseOption.controls['imp_import'].setValue(0);
      this.formPurcharseOption.controls['imp_iva'].setValue(0);
    } else {
      this.calcularImportacion();
    }
  }

  autoCalculate() {
    !this.autocalcular ? this.calculateTotal() : null;
    this.autocalcular = !this.autocalcular;
  }

  formatDecimal(decimal: number | string): number {
    decimal = String(decimal);

    if (decimal.includes('.')) {
      let newNumber = decimal.split('.');
      decimal =
        newNumber[0] +
        '.' +
        newNumber[1][0] +
        (newNumber[1][1] ? newNumber[1][1] : '');
      return Number(decimal);
    } else {
      return Number(decimal);
    }
  }
}
