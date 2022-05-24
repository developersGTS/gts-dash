import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/dash/interfaces/note.interface';
import { QtCardNoteAddComponent } from '../qt-card-note-add/qt-card-note-add.component';

@Component({
  selector: 'app-qt-card-note-resumen-v1',
  templateUrl: './qt-card-note-resumen-v1.component.html',
  styleUrls: ['./qt-card-note-resumen-v1.component.scss'],
})
export class QtCardNoteResumenV1Component implements OnInit {
  @Input() note: Note = {
    title: '',
    description: '',
  };

  @Output() emitNote: EventEmitter<Note> = new EventEmitter();
  @Output() emitDeleteNote: EventEmitter<boolean> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {}

  openAddNote(): void {
    const dialogRef = this.dialog.open(QtCardNoteAddComponent, {
      disableClose: true,
      data: this.note,
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      result ? this.setNote(result) : null;
    });
  }

  setNote(note: Note) {
    this.note = note;
    this.emitNoteFn();
  }

  emitNoteFn() {
    this.emitNote.emit(this.note);
  }

  deleteNote() {
    this.emitDeleteNote.emit(true);
  }
}
