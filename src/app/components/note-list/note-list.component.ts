import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';
import { NoteComponent } from '../note/note.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoteEditComponent } from '../note-edit/note-edit.component';
import { TranslatePipe } from '@ngx-translate/core';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NoteComponent,
    NoteEditComponent,
    TranslatePipe,
  ],
})
export class NoteListComponent {
  readonly noteService = inject(NoteService);

  notes = this.noteService.noteList;
  selected = this.noteService.selected;
}
