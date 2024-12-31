import { inject, Injectable } from '@angular/core';
import { Note, NoteData } from './note.model';
import { Store } from '@ngrx/store';
import {
  selectAllNotes,
  selectSelectedNote,
  selectSelectedNoteId,
} from './note.selector';
import { noteActions } from './note.actions';
import { NoteState } from './note.reducer';

@Injectable({
  providedIn: 'root',
})
export class NoteFacade {
  private store = inject(Store<NoteState>);

  notes$ = this.store.select(selectAllNotes);
  selectedId$ = this.store.select(selectSelectedNoteId);
  selected$ = this.store.select(selectSelectedNote);

  add(note: NoteData) {
    return this.store.dispatch(noteActions.add({ note }));
  }

  update(id: string, note: Note) {
    return this.store.dispatch(noteActions.update({ id, note }));
  }

  delete(id: string) {
    return this.store.dispatch(noteActions.delete({ id }));
  }

  select(id?: string) {
    return this.store.dispatch(noteActions.select({ id }));
  }
}
