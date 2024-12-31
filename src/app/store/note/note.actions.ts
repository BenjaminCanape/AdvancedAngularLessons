import { createActionGroup, props } from '@ngrx/store';
import { Note, NoteData } from './note.model';

export const noteActions = createActionGroup({
  source: 'Note',
  events: {
    Add: props<{ note: NoteData }>(),
    'Add Success': props<{ note: Note }>(),
    'Add Failure': props<{ error: string }>(),
    Update: props<{ id: string; note: Note }>(),
    'Update Success': props<{ id: string; note: Note }>(),
    'Update Failure': props<{ error: string }>(),
    Delete: props<{ id: string }>(),
    'Delete Success': props<{ id: string }>(),
    'Delete Failure': props<{ error: string }>(),
    Select: props<{ id?: string }>(),
  },
});
