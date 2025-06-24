import { Injectable, signal } from '@angular/core';
import { Note } from '../models/note';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}
  notes = signal<Note[]>([]);

  //creating a note
  createNote(note: Note) {
    this.notes.set([note, ...this.notes()]);
    // return this.http.post(`${environment.baseURL}/notes`, note)
  }

  //read all notes
  readAllNotes() {
    return this.notes();
    // return this.http.get(`${environment.baseURL}/notes`)
  }

  //update a single note
  updateNote(id: number, update: Note) {
    this.notes().map((note) =>
      note.id === id
        ? { ...note, content: update.content, title: update.title }
        : note
    );
    // return this.http.put(`${environment.baseURL}/notes/${id}`, note)
  }

  //delete a single note
  deleteNote(id: number) {
    this.notes.set(this.notes().filter((note) => note.id !== id));
    // return this.http.delete(`${environment.baseURL}/notes/${id}`);
  }

  archiveNote(id: number) {
    this.notes.set(
      this.notes().map((note) =>
        note.id === id ? { ...note, isArchived: true } : note
      )
    );
    // return this.http.get(`${environment.baseURL}/notes/${id}/archive`)
  }
}
