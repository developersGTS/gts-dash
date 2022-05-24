import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Note } from 'src/app/dash/interfaces/note.interface';
import { QtCardNoteAddComponent } from '../../../components/cards/notes/qt-card-note-add/qt-card-note-add.component';

@Component({
  selector: 'app-qt-notes',
  templateUrl: './qt-notes.component.html',
  styleUrls: ['./qt-notes.component.scss'],
})
export class QtNotesComponent implements OnInit {
  @Input() notes: Note[] = [];
  @Output() emitNotes: EventEmitter<Note[]> = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  openAddNote(): void {
    const dialogRef = this.dialog.open(QtCardNoteAddComponent, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      result ? this.notes.push(result) : null;
    });
  }

  ngOnInit(): void {}

  emitNotesFn() {
    this.emitNotes.emit(this.notes);
  }

  updateNote(index: number, note: Note) {
    this.notes[index] = note;
    this.emitNotesFn();
  }

  deleteNote(index: number) {
    this.notes.splice(index, 1);
    this.emitNotesFn();
  }

  deleteAllNotes() {
    this.notes = [];
    this.emitNotesFn();
  }
}
