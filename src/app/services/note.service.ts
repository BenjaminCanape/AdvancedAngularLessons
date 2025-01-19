import { Injectable, signal, WritableSignal } from '@angular/core';
import { Note, NoteData } from '../model/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  noteList: WritableSignal<Note[]> = signal([]);
  selectedId: WritableSignal<string | undefined> = signal(undefined);
  selected: WritableSignal<Note | undefined> = signal(undefined);

  select(selectedId?: string) {
    this.selectedId.set(selectedId);
    const selectedNote = this.noteList().find(note => note.id === selectedId);
    this.selected.set(selectedNote);
  }

  add(note: NoteData) {
    console.log('Here you will call the api to add the note:', note);
    const id = crypto.randomUUID().toString();
    const creationDate = new Date();

    const noteObject = { id, creationDate, ...note };
    this.noteList.update(noteList => [noteObject, ...noteList]);
    this.select(id);
  }

  update(id: string, note: Note) {
    console.log('Here you will call the api to update the note:', note);
    this.noteList.update(notes =>
      notes.map(n => (n.id === id ? { ...n, ...note } : n))
    );
  }

  delete(id: string) {
    console.log('Here you will call the api to delete the note:', id);
    this.noteList.update(notes => notes.filter(note => note.id !== id));
  }
}
