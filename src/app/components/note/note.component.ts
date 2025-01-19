import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { filter, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { TranslatePipe } from '@ngx-translate/core';
import { Note } from '../../model/note.model';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note',
  imports: [CommonModule, MatIcon, TranslatePipe],
  templateUrl: './note.component.html',
  styleUrl: './note.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NoteComponent {
  readonly dialog = inject(MatDialog);
  readonly noteService = inject(NoteService);

  @Input() note: Note;

  openNote(noteId: string, event: Event): void {
    // to avoid propagation when remove button is clicked
    // (and to make the confirm delete dialog close correctly)
    if (event?.target && (event.target as HTMLElement).closest('.remove-btn')) {
      return;
    }
    this.noteService.select(noteId);
  }

  confirmDeleteNote(noteId: string, event: Event): void {
    event.preventDefault();
    const dialogRef = this.dialog.open(ConfirmationDialogComponent);

    dialogRef
      .afterClosed()
      .pipe(
        filter(value => value === true),
        tap(() => this.noteService.delete(noteId))
      )
      .subscribe();
  }
}
