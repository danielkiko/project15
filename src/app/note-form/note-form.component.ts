import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { Note } from 'src/app/shared/interfaces/note.interface';
import { HttpNoteService } from 'src/app/shared/services/http-note.service';
import { AppComponent } from '../app.component';
import { Type } from '../shared/interfaces/type.interface';


@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.css']
})
export class NoteFormComponent implements OnInit {

  @Input() typearr:Type[];
  NoteForm!: FormGroup;
  TypeForm!: FormGroup;
  @Output() noteAdd = new EventEmitter<Note>();
  @Output() typeAdd = new EventEmitter<Type>();
  @Output() typedelete = new EventEmitter<number>();
 
  type: Type;
  status = false;
  typecontainer: Type;
  linkedtype!: Type;
  typename: string;


  constructor(private fb: FormBuilder, private httpNoteservice: HttpNoteService) { }
   ngOnInit(): void {
    const controls = {
      name: [null, [Validators.required, Validators.maxLength(100)]],
      maintext: [null, [Validators.required, Validators.maxLength(100)]],
      date: new Date,
      type: [null, [Validators.required, Validators.maxLength(100)]]
    }
    const typecontrols = {
      name: [null, [Validators.required, Validators.maxLength(100)]]
    }
    this.TypeForm = this.fb.group(typecontrols);
    this.NoteForm = this.fb.group(controls);
    

  }
  async onAddNote() {
    this.NoteForm.controls['date'].setValue(new Date);
    let typeid = this.TypeForm.controls['name'].value;
    typeid = +typeid;
    this.NoteForm.controls['type'].setValue(typeid);
    const note = this.NoteForm.value;
    console.log(this.NoteForm.value);
    this.noteAdd.emit(note);
    
  }
  onEdittype() {
    this.status = !this.status;
  }
  onAddtype() {
    const type = this.TypeForm.value;
    this.typeAdd.emit(type);
    this.status = !this.status;
    console.log(this.typearr);
  }
  onDeletetype() {
    let typeid = this.TypeForm.controls['name'].value;
    typeid = +typeid;
    this.typedelete.emit(typeid);
  }
  
  
 
}
