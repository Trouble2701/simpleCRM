import { Component, inject, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { User } from '../../moduls/user.class';
import { collection, Firestore, onSnapshot, addDoc, query } from '@angular/fire/firestore';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

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
  company: string = '';

  loading: boolean = false;
  usersKndr: any[] = [];
  allkdnr:number[] = [];
  failedAnswer:string = 'Please fill out all fields';

  @ViewChild('failed') failed: any | ElementRef;
  @ViewChild('first') first: any | ElementRef;
  @ViewChild('last') last: any | ElementRef;
  @ViewChild('email') email: any | ElementRef;
  @ViewChild('telNumber') telNumber: any | ElementRef;
  @ViewChild('birthday') birthday: any | ElementRef;
  @ViewChild('street') street: any | ElementRef;
  @ViewChild('zipcode') zip: any | ElementRef;
  @ViewChild('city') city: any | ElementRef;

  readonly dialogRef = inject(MatDialogRef);

  firestore = inject(Firestore)

  constructor(public dialog: MatDialog, private router: Router) {
    this.subUser();
  }
  ngOnInit(): void {

  }

  checkData(){
    if(this.checkInput()){
      this.zipCode();
    }else{
      this.failedShow('flex', 'Please fill out all fields');
    }
  }

  checkInput(){
    return this.user.firstName && this.user.lastName && this.user.email && this.birthDate && this.user.street && this.user.zipCode && this.user.city ? true : false;
  }

  zipCode(){
    if(this.checkZipCode(this.user.zipCode)){
      this.emailCode();
    }else{
      this.failedShow('flex', 'The zip code can only consist of numbers');
    }
  }

  checkZipCode(code:any){
    return /^-?\d+$/.test(code);
  }

  emailCode(){
    if(this.checkEmailCode()){
      this.existsUser();
    }else{
      this.failedShow('flex', 'Please provide a correct e-mail');
    }
  }

  checkEmailCode(){
    let validRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return this.user.email.match(validRegex) ? true : false;
  }

  existsUser(){
    if(!this.checkExistUser()){
      this.checkTelephone();
    }else{
      this.failedShow('flex', 'User Exists');
    }
  }

  checkExistUser():any{
    for(let i = 0; i < this.usersKndr.length; i++){
      if(this.usersKndr[i].firstName.toLowerCase() == this.user.firstName.toLowerCase() && this.usersKndr[i].lastName.toLowerCase() == this.user.lastName.toLowerCase() && this.usersKndr[i].email.toLowerCase() == this.user.email.toLowerCase()){
        return true;
      }else if(this.usersKndr[i].email.toLowerCase() == this.user.email.toLowerCase()){
        return true;
      }else if(i == this.usersKndr.length-1){
        return false;
      }
    }
  }

  checkTelephone(){
    if(this.user.telephone){
      if(this.checkNumber(this.user.telephone)){
        this.failedShow('none', '');
        this.saveUser();
      }else{
        this.failedShow('flex', 'The Tel. Number can only consist of numbers');
      }
    }else{
      this.failedShow('none', '');
      this.saveUser();
    }
  }

  checkNumber(code:any){
    return /^-?\d+$/.test(code);
  }

  failedShow(see:string, answer:string){
    this.failedAnswer = answer;
    this.failed.nativeElement.setAttribute('style', 'display:'+see+';');
    this.first.nativeElement.setAttribute('style', this.user.firstName ? 'color: unset' : 'color: red !important;');
    this.last.nativeElement.setAttribute('style', this.user.lastName ? 'color: unset' : 'color: red !important;');
    this.email.nativeElement.setAttribute('style', this.user.email && this.checkEmailCode() ? 'color: unset' : 'color: red !important;');
    if(this.user.telephone) this.telNumber.nativeElement.setAttribute('style', this.checkNumber(this.user.telephone) ? 'color: unset' : 'color: red !important;');
    this.birthday.nativeElement.setAttribute('style', this.birthDate ? 'color: unset' : 'color: red !important;');
    this.street.nativeElement.setAttribute('style', this.user.street ? 'color: unset' : 'color: red !important;');
    this.zip.nativeElement.setAttribute('style', this.user.zipCode && this.checkZipCode(this.user.zipCode) ? 'color: unset' : 'color: red !important;');
    this.city.nativeElement.setAttribute('style', this.user.city ? 'color: unset' : 'color: red !important;');
  }

  async saveUser() {
    this.allkdnrRead();
      this.loading = true;
      this.user.birthDate = this.birthDate.getTime();
      this.user.company = !this.company ? 'Private' : this.company;
      await this.addKdnr();
  }

  async addKdnr() {
    let calcKdnr: number = await this.calcKdnr();
    if (this.usersKndr.length == 0) {
      this.saveKdnr(calcKdnr);
    } else {
      for (let i = 0; i < this.usersKndr.length; i++) {
        if (this.usersKndr[i].kdnr == calcKdnr) calcKdnr = await this.calcKdnr(); else if (i == this.usersKndr.length - 1) this.saveKdnr(calcKdnr);
      }
    }
  }

  saveKdnr(calcKdnr:number) {
    this.user.kdnr = calcKdnr;
    this.usersKndr = [];
    this.addUser(this.user.toJson());
  }

  async calcKdnr() {
    let min = 1;
    let max = 9999;
    return Math.round((Math.random() * (max - min)) * (Math.random() * (max - min))) + 12345678;
  }

  subUser() {
    const q = query(this.getUserRef());
    return onSnapshot(q, (list) => {
      this.usersKndr = [];
      list.forEach(element => {
        this.usersKndr.push(element.data());
      })
    });
  }

  allkdnrRead(){
    for (let i = 0; i < this.usersKndr.length; i++) {
      this.allkdnr.push(this.usersKndr[i].kdnr);
    }

    console.log(this.allkdnr);
  }

  async addUser(item: any) {
    await addDoc(this.getUserRef(), item).catch(
      (err) => { console.error(err) }
    ).then(
      (docRef) => { 
        setTimeout(() => this.openNewUser(docRef?.id), 200); 
        this.closeDialog();
      }
    )
  }

  openNewUser(id:any){
    this.router.navigate(['/user/' + id]);
  }

  closeDialog() {
    this.loading = false;
    this.dialogRef.close();
  }

  getUserRef() {
    return collection(this.firestore, 'users');
  }
}
