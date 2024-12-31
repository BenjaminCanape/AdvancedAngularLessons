import { createFeatureSelector, createSelector } from '@ngrx/store';
import { NoteState } from './note.reducer';

export const selectNoteState = createFeatureSelector<NoteState>('notes');

export const selectAllNotes = createSelector(
  selectNoteState,
  state => state.notes
);

export const selectSelectedNoteId = createSelector(
  selectNoteState,
  state => state.selectedId
);

export const selectSelectedNote = createSelector(
  selectAllNotes,
  selectSelectedNoteId,
  (notes, selectedId) => notes.find(note => note.id === selectedId)
);
