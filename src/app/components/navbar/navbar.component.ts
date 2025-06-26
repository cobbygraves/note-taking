import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { FormsModule, NgForm } from '@angular/forms';
import { NoteService } from '../../services/note.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  term: string = '';
  constructor(
    public userService: UserService,
    private noteService: NoteService
  ) {}

  searchNote(form: NgForm) {
    this.term = form.value.term;
    // console.log(this.term);
    this.noteService.searchNotes(this.term).subscribe({
      next: (notes) => {
        // console.log(notes);
        this.noteService.notes.set(notes);
      },
      error: (err) => console.log(err),
    });
    form.reset();
  }
}
