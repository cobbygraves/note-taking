import { Component, OnInit } from '@angular/core';
import { NoteService } from '../../services/note.service';
import { NoPostComponent } from '../no-post/no-post.component';
import { NoteCardComponent } from '../note-card/note-card.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-dashboard',
  imports: [NoPostComponent, NoteCardComponent, ProgressSpinnerModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  constructor(
    public noteService: NoteService,
    public userService: UserService
  ) {}
  isLoading = true;
  tags: { _id: string }[] = [];
  ngOnInit() {
    this.noteService.readAllNotes().subscribe({
      next: (notes) => {
        this.noteService.notes.set(notes);
        this.isLoading = false;
      },
      error: (err) => console.log(err),
    });

    this.noteService.getNoteTags().subscribe({
      next: (tags: any) => {
        this.tags = tags;
      },
      error: (err) => console.log(err),
    });
  }

  showArchivedNotes() {
    this.isLoading = true;
    this.noteService.getArchivedNotes().subscribe({
      next: (notes) => {
        console.log(notes);
        this.noteService.notes.set(notes);
        this.isLoading = false;
      },
      error: (err) => console.log(err),
    });
  }

  showAllNotes() {
    this.isLoading = true;
    this.noteService.readAllNotes().subscribe({
      next: (notes) => {
        this.noteService.notes.set(notes);
        this.isLoading = false;
      },
      error: (err) => console.log(err),
    });
  }

  showNotesByTag(tag: string) {
    this.isLoading = true;
    this.noteService.getNotesByTag(tag).subscribe({
      next: (notes) => {
        this.noteService.notes.set(notes);
        this.isLoading = false;
      },
      error: (err) => console.log(err),
    });
  }
}
