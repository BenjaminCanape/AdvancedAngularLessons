import { Component, inject, Input, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { NoteFacade } from '../../store/note/note.facade';
import { Note } from '../../store/note/note.model';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-note-edit',
  imports: [
    CommonModule,
    MatFormField,
    MatIcon,
    MatInputModule,
    MatLabel,
    ReactiveFormsModule,
    TranslatePipe,
  ],
  templateUrl: './note-edit.component.html',
  styleUrl: './note-edit.component.scss',
})
export class NoteEditComponent implements OnInit {
  readonly fb = inject(FormBuilder);
  readonly noteFacade = inject(NoteFacade);

  @Input() note: Note;

  noteForm: FormGroup;

  ngOnInit(): void {
    this.noteForm = new FormGroup({
      title: new FormControl(this.note.title ?? ''),
      content: new FormControl(this.note.content ?? ''),
    });
  }

  unselectNote(noteId: string): void {
    if (this.noteForm.dirty) {
      this.saveNote(noteId);
    }
    this.noteFacade.select(undefined);
  }

  private saveNote(id: string): void {
    const { title, content } = this.noteForm.value;
    const creationDate = this.note.creationDate;
    this.noteFacade.update(id, { id, creationDate, title, content });
  }
}
