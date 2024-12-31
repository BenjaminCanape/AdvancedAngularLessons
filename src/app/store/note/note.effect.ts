import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { map, catchError, switchMap, tap } from 'rxjs/operators';
import { NoteService } from '../../services/note.service';
import { noteActions } from './note.actions';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';

@Injectable()
export class NoteEffects {
  private actions$ = inject(Actions);
  private noteService = inject(NoteService);
  private snackBar = inject(MatSnackBar);
  private translateService = inject(TranslateService);

  addNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.add),
      switchMap(({ note }) =>
        this.noteService.add(note).pipe(
          map(note => noteActions.addSuccess({ note })),
          catchError(error => of(noteActions.addFailure({ error })))
        )
      )
    )
  );

  addNoteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(noteActions.addSuccess),
        switchMap(() => this.showSnackBar('notes.add_success'))
      ),
    { dispatch: false }
  );

  selectNoteWhenAdded$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.addSuccess),
      map(({ note }) => noteActions.select({ id: note.id }))
    )
  );

  deleteNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.delete),
      switchMap(({ id }) =>
        this.noteService.delete(id).pipe(
          map(() => noteActions.deleteSuccess({ id })),
          catchError(error => of(noteActions.deleteFailure({ error })))
        )
      )
    )
  );

  deleteNoteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(noteActions.deleteSuccess),
        switchMap(() => this.showSnackBar('notes.deletion_success'))
      ),
    { dispatch: false }
  );

  updateNote$ = createEffect(() =>
    this.actions$.pipe(
      ofType(noteActions.update),
      switchMap(({ id, note }) =>
        this.noteService.update(id, note).pipe(
          map(note => noteActions.updateSuccess({ id, note })),
          catchError(error => of(noteActions.updateFailure({ error })))
        )
      )
    )
  );

  updateNoteSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(noteActions.updateSuccess),
        switchMap(() => this.showSnackBar('notes.update_success'))
      ),
    { dispatch: false }
  );

  noteFailed$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          noteActions.addFailure,
          noteActions.updateFailure,
          noteActions.deleteFailure
        ),
        switchMap(() => this.showSnackBar('errors.occurred'))
      ),
    { dispatch: false }
  );

  private showSnackBar(messageKey: string) {
    return this.translateService.get(messageKey).pipe(
      tap(text => {
        this.snackBar.open(text, undefined, { duration: 3000 });
      })
    );
  }
}
