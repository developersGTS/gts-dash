import {
  Component,
  EventEmitter,
  Inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { Note } from 'src/app/dash/interfaces/note.interface';
import { QtCardNoteAddComponent } from '../qt-card-note-add/qt-card-note-add.component';

@Component({
  selector: 'app-qt-card-notes',
  templateUrl: './qt-card-notes-item.component.html',
  styleUrls: ['./qt-card-notes-item.component.scss'],
})
export class QtCardNotesItemComponent implements OnInit {
  @Input() notes: Note[] = [];

  @Output() emitNotes: EventEmitter<Note[]> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<QtCardNotesItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note[]
  ) {}

  ngOnInit(): void {
    this.data ? (this.notes = this.data) : null;
  }

  openAddNote(index?: number, note?: Note): void {
    console.log('index', index);
    const dialogRef = this.dialog.open(QtCardNoteAddComponent, {
      disableClose: true,
      data: note ? note : undefined,
    });

    dialogRef.afterClosed().subscribe((result: Note) => {
      console.log('index close', index);
      if (note && (index || index == 0)) {
        result ? (this.notes[index] = result) : null;
      } else {
        result ? this.addNote(result) : null;
      }
    });
  }

  addNote(note: Note) {
    this.notes.push(note);
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

  emitNotesFn() {
    this.emitNotes.emit(this.notes);
  }
}
