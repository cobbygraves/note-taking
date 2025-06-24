import { Component, Input } from '@angular/core';
import { Note } from '../../models/note';

@Component({
  selector: 'app-note-card',
  imports: [],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent {
  @Input() note: Note | null = null;
}
