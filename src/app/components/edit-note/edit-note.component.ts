import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NoteService } from '../../services/note.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-note',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './edit-note.component.html',
  styleUrl: './edit-note.component.scss',
})
export class EditNoteComponent implements OnInit {
  addNoteForm: FormGroup;
  noteId: string = '';
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private noteService: NoteService,
    private route: ActivatedRoute
  ) {
    this.addNoteForm = this.fb.group({
      title: ['', [Validators.required]],
      content: ['', [Validators.required]],
      tags: [''],
    });
  }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('id')!; // ! is for type assertion;
    this.noteService.readNote(this.noteId).subscribe({
      next: (note) => {
        this.addNoteForm.patchValue({
          title: note.title,
          content: note.content,
          tags: note.tags.join(', '),
        });
      },
      error: (err) => console.log(err),
    });
  }

  updateNote() {
    if (this.addNoteForm.valid) {
      const note = this.addNoteForm.value;
      let updateTags: string[] = [];
      if (note.tags) {
        updateTags = note.tags.split(',');
      }
      console.log(this.noteId);
      this.noteService
        .updateNote(this.noteId, { ...note, tags: updateTags })
        .subscribe({
          next: (value) => {
            // console.log(value);
            this.router.navigate(['/notes']);
          },
          error: (err) => console.log(err),
        });
    }
  }

  cancelUpdatePost() {
    this.router.navigate(['/notes']);
  }
}
