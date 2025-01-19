import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoteListComponent } from './components/note-list/note-list.component';

import { MatFabButton } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';
import { NoteService } from './services/note.service';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    MatDialogModule,
    MatFabButton,
    MatIcon,
    MatToolbarModule,
    NoteListComponent,
    TranslatePipe,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  readonly noteService = inject(NoteService);
  readonly translateService = inject(TranslateService);

  constructor() {
    this.translateService.addLangs(['fr', 'en']);
    this.translateService.use(navigator.language.split('-')[0]);
    this.translateService.setDefaultLang('en');
  }

  openAddNoteForm = () => {
    this.noteService.add({ title: '', content: '' });
  };
}
