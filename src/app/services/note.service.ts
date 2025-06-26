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

  //read a single note
  readNote(id: string | number): Observable<Note> {
    return this.http.get<Note>(`${environment.baseURL}/notes/${id}`);
  }

  //update a single note
  updateNote(id: string | number, update: Note) {
    console.log(update);
    console.log(id);
    return this.http.put(`${environment.baseURL}/notes/${id}`, update);
  }

  //delete a single note
  deleteNote(id: string | number) {
    return this.http.delete(`${environment.baseURL}/notes/${id}`);
  }

  archiveNote(id: number | undefined, isArchived: boolean) {
    return this.http.get(
      `${environment.baseURL}/notes/${id}/archive?isArchived=${!isArchived}`
    );
  }

  //get all archived notes
  getArchivedNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.baseURL}/notes/archived`);
  }

  //get all note tags
  getNoteTags(): Observable<string[]> {
    return this.http.get<string[]>(`${environment.baseURL}/tags`);
  }

  //get all notes by tag
  getNotesByTag(tag: string): Observable<Note[]> {
    return this.http.get<Note[]>(`${environment.baseURL}/notes/tags/${tag}`);
  }

  //search notes
  searchNotes(term: string): Observable<Note[]> {
    return this.http.get<Note[]>(
      `${environment.baseURL}/notes/search?term=${term}`
    );
  }
}
