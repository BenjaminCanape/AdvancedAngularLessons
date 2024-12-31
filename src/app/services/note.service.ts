import { Injectable } from '@angular/core';
import { Note, NoteData } from '../store/note/note.model';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  add(note: NoteData): Observable<Note> {
    console.log('Here you will call the api to add the note:', note);
    const id = crypto.randomUUID().toString();
    const creationDate = new Date();
    return of({ id, creationDate, ...note });
  }

  update(id: string, note: Note) {
    console.log('Here you will call the api to update the note:', note);
    return of(note);
  }

  delete(id: string) {
    console.log('Here you will call the api to delete the note:', id);
    return of(true);
  }
}
