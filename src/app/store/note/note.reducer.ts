import { createReducer, on } from '@ngrx/store';
import { noteActions } from './note.actions';
import { Note } from './note.model';

export interface NoteState {
  notes: Note[];
  selectedId?: string;
}

const initialState: NoteState = {
  notes: [],
  selectedId: undefined,
};

export const noteReducer = createReducer(
  initialState,
  on(noteActions.addSuccess, (state, { note }) => ({
    ...state,
    notes: [note, ...state.notes],
  })),
  on(noteActions.updateSuccess, (state, { id, note }) => ({
    ...state,
    notes: state.notes.map(n => (n.id === id ? { ...n, ...note } : n)),
  })),
  on(noteActions.deleteSuccess, (state, { id }) => ({
    ...state,
    notes: state.notes.filter(note => note.id !== id),
  })),
  on(noteActions.select, (state, { id }) => ({
    ...state,
    selectedId: id,
  }))
);
