import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  Contact,
  ContactPopulated,
} from '../../../interfaces/contact.interface';

@Component({
  selector: 'app-con-preview',
  templateUrl: './con-preview.component.html',
  styleUrls: ['./con-preview.component.scss'],
})
export class ConPreviewComponent implements OnInit {
  @Input() contact: ContactPopulated = {
    company: {
      nickname: '',
      profit_percent: 0.8,
    },
    name: '',
  };

  // CONTACT DATA DEFAULT
  phone: string = '';
  movil: string = '';
  ext: string = '';
  mail: string = '';

  constructor(
    public dialogRef: MatDialogRef<ConPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ContactPopulated
  ) {}

  ngOnInit(): void {
    this.data ? (this.contact = this.data) : null;
    this.setContactDefault();
  }

  setContactDefault() {
    if (this.contact.contact) {
      for (let contact of this.contact.contact) {
        if (contact.default) {
          contact.phone ? (this.phone = contact.phone) : null;
          contact.movil ? (this.movil = contact.movil) : null;
          contact.ext ? (this.ext = contact.ext) : null;
          contact.mail ? (this.mail = contact.mail) : null;
          return;
        }
      }
    }
  }
}
