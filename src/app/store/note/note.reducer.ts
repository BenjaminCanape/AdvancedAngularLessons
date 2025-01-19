import { createReducer } from '@ngrx/store';

// eslint-disable-next-line @typescript-eslint/no-empty-object-type
export interface NoteState {}

const initialState: NoteState = {};

export const noteReducer = createReducer(initialState);
