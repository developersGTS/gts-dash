import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ServicePopulated } from '../../../interfaces/service.interface';

@Component({
  selector: 'app-ser-preview',
  templateUrl: './ser-preview.component.html',
  styleUrls: ['./ser-preview.component.scss'],
})
export class SerPreviewComponent implements OnInit {
  @Input() service: ServicePopulated = {
    _id: '',
    company: {
      nickname: '',
      profit_percent: 0.8,
    },
    contact: {
      company: '',
      name: '',
    },
    general_description: '',
    status: '',
  };

  constructor(
    public dialogRef: MatDialogRef<SerPreviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ServicePopulated
  ) {}

  ngOnInit(): void {
    this.data ? (this.service = this.data) : null;
  }
}
