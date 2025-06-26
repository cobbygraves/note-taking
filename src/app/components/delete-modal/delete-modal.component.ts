import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-delete-modal',
  imports: [],
  templateUrl: './delete-modal.component.html',
  styleUrl: './delete-modal.component.scss',
})
export class DeleteModalComponent {
  @Output() deleteNoteEvent = new EventEmitter();
  @Output() cancelDeleteEvent = new EventEmitter();

  deleteNote() {
    // console.log('delete note');
    this.deleteNoteEvent.emit();
  }

  cancelDelete() {
    // console.log('cancel delete');
    this.cancelDeleteEvent.emit();
  }
}
