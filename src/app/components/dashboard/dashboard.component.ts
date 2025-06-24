import { Component } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { NoPostComponent } from '../no-post/no-post.component';
import { NoteCardComponent } from '../note-card/note-card.component';

@Component({
  selector: 'app-dashboard',
  imports: [NoPostComponent, NoteCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  constructor(public noteService: NoteService) {}
}
