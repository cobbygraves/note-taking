import { Component, Input, OnInit } from '@angular/core';
import { Note } from '../../models/note';
import { ToggleSwitchModule } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-card',
  imports: [ToggleSwitchModule, FormsModule],
  templateUrl: './note-card.component.html',
  styleUrl: './note-card.component.scss',
})
export class NoteCardComponent implements OnInit {
  @Input() note: Note | null = null;
  checked: boolean = false;
  showDeleteModal: boolean = false;

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    this.checked = this.note?.isArchived || false;
  }

  deleteNote(id: number | undefined) {
    this.showDeleteModal = true;
  }

  showEditNote(id: number | undefined) {
    this.router.navigate([`notes/${id}/edit`]);
  }

  archiveNote(id: number | undefined) {
    this.noteService.archiveNote(id, !this.checked).subscribe({
      next: () => {},
      error: (err) => console.log(err),
    });
  }
  showNote(id: number | undefined) {
    this.router.navigate([`notes/${id}`]);
  }
}
