import { Component, Inject, Input, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Note } from 'src/app/dash/interfaces/note.interface';

@Component({
  selector: 'app-qt-card-note-add',
  templateUrl: './qt-card-note-add.component.html',
  styleUrls: ['./qt-card-note-add.component.scss'],
})
export class QtCardNoteAddComponent implements OnInit {
  @Input() note: Note = {
    title: '',
    description: '',
  };

  formNote = this._fb.group({
    title: ['', Validators.required],
    description: ['', Validators.required],
  });

  constructor(
    private _fb: FormBuilder,
    public dialogRef: MatDialogRef<QtCardNoteAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Note
  ) {}

  ngOnInit(): void {
    if (this.data) {
      this.data.title
        ? this.formNote.controls['title'].setValue(this.data.title)
        : null;
      this.data.description
        ? this.formNote.controls['description'].setValue(this.data.description)
        : null;
    }
  }

  addNote() {
    this.formNote.markAllAsTouched();

    if (this.formNote.valid) {
      this.note.title = this.formNote.controls['title'].value;
      this.note.description = this.formNote.controls['description'].value;

      this.dialogRef.close(this.note);
    }
  }

}
