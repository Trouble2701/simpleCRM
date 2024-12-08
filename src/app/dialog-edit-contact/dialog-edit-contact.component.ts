import { Component, inject, Injectable, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { User } from '../../moduls/user.class';
import { collection, Firestore, onSnapshot, doc, updateDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { provideNativeDateAdapter } from '@angular/material/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dialog-edit-contact',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule],
   templateUrl: './dialog-edit-contact.component.html',
  styleUrl: './dialog-edit-contact.component.scss'
})


@Injectable({
  providedIn: 'root'
})
export class DialogEditContactComponent {

  firestore = inject(Firestore);
  user: User = new User();
  failedAnswer = 'Please fill out all fields';
  findUserId:any = '';
  @ViewChild('failed') failed: any | ElementRef;
  @ViewChild('email') email: any | ElementRef;
  readonly dialogRef = inject(MatDialogRef);
  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute){
    this.subFindUserId();
    this.subUserDetails();
  }

  async subFindUserId() {
    this.findUserId = window.location.pathname.split('/').pop();
  }

  subUserDetails() {
    return onSnapshot(this.getUsersRef(), (list) => {
      this.user = new User(list.data());
    });
  }

  checkData(){
    if(this.checkInput()){
      this.emailCode();
    }else{
      this.failedShow('flex', 'Please fill out all fields');
    }
  }

  checkInput(){
    return this.user.email ? true : false;
  }

  emailCode(){
    if(this.checkEmailCode()){
      this.failedShow('none', '');
      this.updateAdress();
      this.closeDialog();
    }else{
      this.failedShow('flex', 'Please provide a correct e-mail');
    }
  }

  checkEmailCode(){
    let validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return this.user.email.match(validRegex) ? true : false;
  }

  failedShow(see:string, answer:string){
    this.failedAnswer = answer;
    this.failed.nativeElement.setAttribute('style', 'display:'+see+';');
    this.email.nativeElement.setAttribute('style', this.user.email ? 'color: unset' : 'color: red !important;');
  }

  async updateAdress(){
    if(this.findUserId){
      await updateDoc(this.getUsersRef(), this.user.toJson()).catch(
        (err) => {console.error(err)}
      );
    }
  }

  getUsersRef() {
    return doc(collection(this.firestore, 'users'), this.findUserId);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}