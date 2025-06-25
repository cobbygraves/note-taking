import { Injectable, signal } from '@angular/core';
import { Note } from '../models/note';
// import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  constructor(private http: HttpClient) {}
  notes = signal<Note[]>([]);

  //creating a note
  createNote(note: Note) {
    return this.http.post(`${environment.baseURL}/notes/create`, note);
  }

  //read all notes
  readAllNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.baseURL}/notes`);
  }

  //update a single note
  updateNote(id: number, update: Note) {
    return this.http.put(`${environment.baseURL}/notes/${id}`, update);
  }

  //delete a single note
  deleteNote(id: number) {
    return this.http.delete(`${environment.baseURL}/notes/${id}`);
  }

  archiveNote(id: number) {
    return this.http.get(`${environment.baseURL}/notes/${id}/archive`);
  }
}
