import { Component, inject, OnInit, Injectable } from '@angular/core';
import { 
  FormControl,
  Validators,
  FormsModule,
  ReactiveFormsModule } from '@angular/forms';
import {
  MatDialogActions,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../moduls/user.class';
import { collection, Firestore, doc, onSnapshot, addDoc, updateDoc, deleteDoc, query, where, limit, orderBy } from '@angular/fire/firestore';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatDialogContent, 
    FormsModule, 
    MatFormFieldModule, 
    MatDialogActions, 
    MatButtonModule, 
    MatInputModule, 
    MatDialogTitle, 
    MatDatepickerModule, 
    MatProgressBarModule,
    CommonModule,
    ReactiveFormsModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate: any;

  loading: boolean = false;

  readonly dialogRef = inject(MatDialogRef);

  firestore = inject(Firestore)

  constructor(public dialog: MatDialog) {}
  ngOnInit(): void {

  }

  saveUser() {
    this.loading = true;
    this.user.birthDate = this.birthDate.getTime();
    this.addUser(this.user.toJson());
  }

  async addUser(item:any){
    await addDoc(this.getUserRef(), item).catch(
      (err) => {console.error(err)}
    ).then(
      (docRef) => {console.log("Document written with ID:", docRef?.id); this.closeDialog()}
    )
  }

  closeDialog(){
    this.loading = false;
    this.dialogRef.close();
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }
}
