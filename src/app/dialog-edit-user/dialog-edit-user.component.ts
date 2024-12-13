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
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule, MatDatepickerModule],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class DialogEditUserComponent {
  firestore = inject(Firestore);
  user: User = new User();
  failedAnswer = 'Please fill out all fields';
  findUserId:any = '';
  bDay:any;
  bDayShow:any;
  @ViewChild('failed') failed: any | ElementRef;
  @ViewChild('first') first: any | ElementRef;
  @ViewChild('last') last: any | ElementRef;
  @ViewChild('birthday') birthday: any | ElementRef;
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
      this.birthDate();
    });
  }

  checkData(){
    if(this.checkInput()){
      this.user.birthDate = new Date(this.bDay).getTime();
      this.updateUser();
    }else{
      this.failedShow('flex', 'Please fill out all fields');
    }
  }

  checkInput(){
    return this.user.firstName && this.user.lastName && this.bDay ? true : false;
  }

  failedShow(see:string, answer:string){
    this.failedAnswer = answer;
    this.failed.nativeElement.setAttribute('style', 'display:'+see+';');
    this.first.nativeElement.setAttribute('style', this.user.firstName ? 'color: unset' : 'color: red !important;');
    this.last.nativeElement.setAttribute('style', this.user.lastName ? 'color: unset' : 'color: red !important;');
    this.birthday.nativeElement.setAttribute('style', this.bDay ? 'color: unset' : 'color: red !important;');
  }

  birthDate() {
    let today = new Date(this.user.birthDate);
    let yyyy = today.getFullYear();
    let mm:any = today.getMonth() + 1;
    let dd:any = today.getDate();
    let ddS:any = dd;
    let mmS:any = mm; 

    if(dd < 10) ddS = '0' + dd;
    if(mm < 10) mmS = '0' + mm;

    this.bDay = mm + '/' + dd + '/' + yyyy;
    this.bDayShow = ddS + '.' + mmS + '.' + yyyy;
  }

  async updateUser(){
    if(this.findUserId){
      await updateDoc(this.getUsersRef(), this.user.toJson()).catch(
        (err) => {console.error(err)}
      );
    }
    this.closeDialog();
  }

  getUsersRef() {
    return doc(collection(this.firestore, 'users'), this.findUserId);
  }

  closeDialog() {
    this.dialogRef.close();
  }
}
