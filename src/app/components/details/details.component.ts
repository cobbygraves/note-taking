import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { ActivatedRoute } from '@angular/router';
import { Note } from '../../models/note';
// import moment from 'moment';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-details',
  imports: [RouterLink, DeleteModalComponent, ProgressSpinnerModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  note: Note | null = null;
  isLoading = true;
  showDeleteModal: boolean = false;
  constructor(
    private router: Router,
    private noteService: NoteService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id')!; // ! is for type assertion;
    this.noteService.readNote(noteId).subscribe({
      next: (note) => {
        this.note = {
          ...note,
        };
        this.isLoading = false;
      },
      error: (err) => console.log(err),
    });
  }

  showDeleteModalHandler() {
    this.showDeleteModal = true;
  }

  cancelDelete() {
    // console.log('cancel delete');
    this.showDeleteModal = false;
  }

  deleteNote() {
    const noteId = this.route.snapshot.paramMap.get('id')!; // ! is for type assertion;
    this.showDeleteModal = false;
    this.noteService.deleteNote(noteId).subscribe({
      next: () => {
        this.router.navigate(['/notes']);
      },
      error: (err) => console.log(err),
    });
  }
}
