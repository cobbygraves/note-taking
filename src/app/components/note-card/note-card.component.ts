import { Component, Input } from '@angular/core';
import { Note } from '../../models/note';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-note-card',
  imports: [ToggleSwitchModule, FormsModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @Input() note: Note | null = null;
  checked: boolean = false;

  constructor(private noteService: NoteService) {
    this.checked = this.note?.isArchived || false;
  }

  deleteNote(id: number | undefined) {}

  archiveNote(id: number | undefined) {
    this.noteService.archiveNote(id, !this.checked).subscribe({
      next: () => {},
      error: (err) => console.log(err),
    });
  }
}
