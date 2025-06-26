import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

@Component({
  selector: 'app-add-post',
  imports: [ReactiveFormsModule, ProgressSpinnerModule],
  templateUrl: './add-post.component.html',
  styleUrl: './add-post.component.scss',
})
export class AddPostComponent {
  addNoteForm: FormGroup;
  isLoading = false;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private noteService: NoteService
  ) {
    this.addNoteForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      tags: [''],
    });
  }

  saveNote() {
    if (this.addNoteForm.valid) {
      this.isLoading = true;
      const note = this.addNoteForm.value;
      let updateTags: string[] = [];
      if (note.tags) {
        updateTags = note.tags.split(',');
      }
      this.noteService.createNote({ ...note, tags: updateTags }).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/notes']);
        },
        error: (err) => console.log(err),
      });
    }
  }

  cancelAddPost() {
    this.router.navigate(['/notes']);
  }
}
