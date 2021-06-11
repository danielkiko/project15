import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteFormComponent } from '../note-form/note-form.component';
import { Note } from '../shared/interfaces/note.interface';
import { Type } from '../shared/interfaces/type.interface';
import { HttpNoteService } from '../shared/services/http-note.service';




@Component({
  selector: 'app-card-form',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.css']
})
export class NoteCardComponent implements OnInit {
  @Input() inputNote!: Note;
  @Output() noteDelete = new EventEmitter<number>();
  @Output() noteEdit = new EventEmitter<Note>();
  status = false;
  NoteForm!: FormGroup;
  TypeForm!: FormGroup;
  type: Type;
  types: Type[];
  linkedtype!: Type;
  typename: string;
  constructor(private fb: FormBuilder, private httpNoteservice: HttpNoteService) { }

  ngOnInit(): void {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      maintext: [null, [Validators.required, Validators.maxLength(100)]],
      date: Date,
      editdate: Date,
      type: [null, [Validators.required, Validators.maxLength(100)]],
    }
    const typecontrols = {
      name: [null, [Validators.required, Validators.maxLength(100)]]
    }
    this.TypeForm = this.fb.group(typecontrols);
    this.getData();
    console.log(this.inputNote.type);
    this.NoteForm = this.fb.group(controls);
    if (this.inputNote) {
      this.NoteForm.patchValue(this.inputNote);
    }

  }
  onDeleteNote() {
    this.noteDelete.emit(this.inputNote.id);
  }
  async onEditNote() {
    this.getData();
    this.status = !this.status;
    if (this.status == false) {
      this.NoteForm.controls['editdate'].setValue(new Date);
      let typeid = this.TypeForm.controls['name'].value;
      typeid = +typeid;
      this.NoteForm.controls['type'].setValue(typeid);
      const note = this.NoteForm.value;
      console.log(this.NoteForm.value);
      this.noteEdit.emit(note);
    }
  }
  async getData() {
    this.types = await this.httpNoteservice.getTypes();
    this.gettypename(this.inputNote.type);
  }
  gettypename(index) {
    let typeindex = this.types.find(x => x.id == index);
    this.typename = typeindex.name;
  }

}
