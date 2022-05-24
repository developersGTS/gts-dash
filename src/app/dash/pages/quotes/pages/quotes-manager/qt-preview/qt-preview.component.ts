import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Note } from 'src/app/dash/interfaces/note.interface';
import { Quotation } from '../../../interfaces/quotation.interface';
import { QuotesService } from '../../../services/quotes.service';
import { PreviewData } from '../quotes-manager.component';

@Component({
  selector: 'app-qt-preview',
  templateUrl: './qt-preview.component.html',
  styleUrls: ['./qt-preview.component.scss'],
})
export class QtPreviewComponent implements OnInit {
  @Input() quotation: Quotation = {
    company: '',
    contact: '',
    description: '',
    priority: 0,
    status: '',
  };

  @Input() readyToSave: boolean = false;

  @Input() preview_data: PreviewData = {};

  @Output() emitNotes: EventEmitter<Note[]> = new EventEmitter();

  constructor(private quotesService: QuotesService, private router: Router) {}

  ngOnInit(): void {}

  getPriority(priority: number) {
    switch (priority) {
      case -1:
        return 'Baja';
      case 0:
        return 'Regular';
      case 1:
        return 'Alta';
      case 2:
        return 'Urgente';
      default:
        return 'Sin Clasificacion';
    }
  }

  setNote(index: number, note: Note) {
    console.log('note', note);
    console.log('this.quotation.notes', this.quotation.notes);

    this.quotation.notes ? (this.quotation.notes[index] = note) : null;
    this.emitNotesFn();
  }

  deleteNote(index: number, confirmation: boolean) {
    confirmation && this.quotation.notes
      ? this.quotation.notes.splice(index, 1)
      : null;
    this.emitNotesFn();
  }

  emitNotesFn() {
    this.emitNotes.emit(this.quotation.notes);
  }

  saveQuotation() {
    if (this.readyToSave) {
      this.quotesService.newQuotation(this.quotation).subscribe((res) => {
        console.log('res', res);
        this.router.navigateByUrl('/dash/quotes');
      });
    } else {
      console.log('no se puede guardar aun, informacion faltante');
    }
  }
}
