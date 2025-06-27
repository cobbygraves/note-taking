import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import { NgForm } from '@angular/forms';
import { NoteService } from '../../services/note.service';
import { ToggleSwitch } from 'primeng/toggleswitch';
import { FormsModule } from '@angular/forms';
import { ThemeService } from '../../services/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, FormsModule, FormsModule, ToggleSwitch],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  term: string = '';
  checked: boolean = true;
  constructor(
    public userService: UserService,
    private noteService: NoteService,
    private themeService: ThemeService,
    private router: Router
  ) {}

  toggleTheme(): void {
    this.themeService.toggleTheme();
  }

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

  goHome() {
    this.router.navigate(['/']);
  }
}
