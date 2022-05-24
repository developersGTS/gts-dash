import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/dash/interfaces/note.interface';
import { QuotationPopulated } from '../../../interfaces/quotation.interface';
import { QuotesService } from '../../../services/quotes.service';

@Component({
  selector: 'app-qt-fastview',
  templateUrl: './qt-fastview.component.html',
  styleUrls: ['./qt-fastview.component.scss'],
})
export class QtFastviewComponent implements OnInit {
  quotation: QuotationPopulated = {
    _id: '',
    company: {
      nickname: '',
      profit_percent: 0.8,
    },
    contact: {
      name: '',
      company: {
        nickname: '',
        profit_percent: 0.8,
      },
    },
    date_request: new Date(),
    description: '',
    subtotal: 0,
    iva: 0,
    total: 0,
    priority: 0,
    status: '',
  };

  constructor(
    private quotesService: QuotesService,
    public dialogRef: MatDialogRef<QtFastviewComponent>,
    @Inject(MAT_DIALOG_DATA) public data: QuotationPopulated
  ) {
    this.data ? (this.quotation = this.data) : null;
  }

  ngOnInit(): void {}

  getPriority(priority: number): string {
    return this.quotesService.getPriorityByNumber(priority);
  }

  getPriorityClass(priority: number): string {
    return `text-${this.quotesService.getPriorityColor(priority)} fw-bold`;
  }

  setNote(index: number, note: Note) {}

  deleteNote(index: number, confirmation: boolean) {}

  closeDialog() {
    this.dialogRef.close();
  }
}
