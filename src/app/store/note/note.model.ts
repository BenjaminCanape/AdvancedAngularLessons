export interface NoteData {
  title?: string;
  content: string;
}

export interface Note extends NoteData {
  id: string;
  creationDate: Date;
}
