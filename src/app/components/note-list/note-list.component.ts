import { Component, inject } from '@angular/core';
import { StoreModule } from '@ngrx/store';

import { CommonModule } from '@angular/common';
import { NoteFacade } from '../../store/note/note.facade';
import { NoteComponent } from '../note/note.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoteEditComponent } from '../note-edit/note-edit.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.scss',
  imports: [
    CommonModule,
    MatProgressSpinnerModule,
    NoteComponent,
    NoteEditComponent,
    StoreModule,
    TranslatePipe,
  ],
})
export class NoteListComponent {
  readonly noteFacade = inject(NoteFacade);

  notes$ = this.noteFacade.notes$;
  selected$ = this.noteFacade.selected$;
}
