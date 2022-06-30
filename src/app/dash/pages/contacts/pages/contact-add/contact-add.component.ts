import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { COMMA, ENTER } from '@angular/cdk/keycodes';

// SERVICES
import { ContactsService } from '../../services/contacts.service';
import { CompanysService } from '../../../companys/services/companys.service';

// INTERFACES
import { Company } from '../../../companys/interfaces/company.interface';

@Component({
  selector: 'app-contact-add',
  templateUrl: './contact-add.component.html',
  styleUrls: ['./contact-add.component.scss'],
})
export class ContactAddComponent implements OnInit {
  companys: Company[] = [];
  companys_loader: boolean = true;

  // ============== MAIL COPY VAR ==============
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  mails_copy: string[] = [];
  // ============== END MAIL COPY ==============

  formAddContact = this._formBuilder.group({
    company: [{ value: '', disable: true }, [Validators.required]],
    name: ['', []],
    phone: ['', []],
    ext: ['', []],
    movil: ['', []],
    mail: ['', []],
    mails_quotes_copy_to: ['', []],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private companysService: CompanysService,
    private contactsService: ContactsService,
    public dialogRef: MatDialogRef<ContactAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // LOAD COMPANYS
    this.companysService
      .getCompanys()
      .pipe(
        tap((res: Company[]) => {
          this.companys = res;
          this.companys_loader = false;
          this.formAddContact.controls['company'].enable();
        })
      )
      .subscribe();
  }

  newContact() {
    this.formAddContact.markAllAsTouched();

    if (this.formAddContact.valid) {
      this.contactsService
        .newContact({
          company: this.formAddContact.controls['company'].value,
          name: this.formAddContact.controls['name'].value,
          mails_quotes_copy_to: this.mails_copy,
          contact: [
            {
              phone: this.formAddContact.controls['phone'].value,
              ext: this.formAddContact.controls['ext'].value,
              movil: this.formAddContact.controls['movil'].value,
              mail: this.formAddContact.controls['mail'].value,
              default: true,
            },
          ],
        })
        .subscribe((res) => {
          if (res) {
            this.dialogRef.close(res);
          }
        });
    }
  }

  // ========== MAIL COPY SECTION ==========

  addMail(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our mail
    if (value) {
      this.mails_copy.push(value);
    }

    // Clear the input value
    event.chipInput!.clear();
  }

  removeMail(mail: any): void {
    const index = this.mails_copy.indexOf(mail);

    if (index >= 0) {
      this.mails_copy.splice(index, 1);
    }
  }
}
