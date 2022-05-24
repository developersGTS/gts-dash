import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Company } from '../../interfaces/company.interface';
import { CompanysService } from '../../services/companys.service';

@Component({
  selector: 'app-company-add',
  templateUrl: './company-add.component.html',
  styleUrls: ['./company-add.component.scss'],
})
export class CompanyAddComponent implements OnInit {
  mode_edit: boolean = false;
  company: Company = {
    nickname: '',
    profit_percent: 0.8,
  };

  formAddCompany = this._formBuilder.group({
    nickname: ['', [Validators.required]],
    razon_social: ['', []],
    rfc: ['', []],
    profit_percent: [
      0.8,
      [Validators.required, Validators.min(0), Validators.max(100)],
    ],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private companysService: CompanysService,
    public dialogRef: MatDialogRef<CompanyAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Company | undefined
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.company = this.data;
      this.mode_edit = true;
      this.setCompanyOnForms();
    } else {
      this.mode_edit = false;
    }
  }

  addCompany() {
    this.formAddCompany.markAllAsTouched();

    console.log(this.formAddCompany.controls['profit_percent'].errors);

    if (this.formAddCompany.valid) {
      console.log('VALID FORM');

      // LOAD COMPANY DATA ---- SET IN THIS.COMPANY  --> DATA OF THE FORM
      this.company.nickname = this.formAddCompany.controls['nickname'].value;
      this.company.datos_fiscales = {
        razon_social: this.formAddCompany.controls['razon_social'].value,
        rfc: this.formAddCompany.controls['rfc'].value,
      };
      this.company.profit_percent =
        this.formAddCompany.controls['profit_percent'].value;

      // VALIDATE EDIT MODE
      if (this.mode_edit) {
        this.companysService.updateCompany(this.company).subscribe((res) => {
          this.dialogRef.close(res);
        });
      } else {
        this.companysService.newCompany(this.company).subscribe((res) => {
          this.dialogRef.close(res);
        });
      }
    }
  }

  setCompanyOnForms() {

    // LOAD NICKNAME
    this.formAddCompany.controls['nickname'].setValue(this.company.nickname);

    // LOAD DATOS FISCALES

    if (this.company.datos_fiscales) {
      // RAZON SOCIAL
      this.formAddCompany.controls['razon_social'].setValue(
        this.company.datos_fiscales.razon_social
          ? this.company.datos_fiscales.razon_social
          : ''
      );

      // RFC
      this.formAddCompany.controls['rfc'].setValue(
        this.company.datos_fiscales.rfc ? this.company.datos_fiscales.rfc : ''
      );
    }

    // LOAD PROFIT
    this.formAddCompany.controls['profit_percent'].setValue(
      this.company.profit_percent
    );
  }
}
