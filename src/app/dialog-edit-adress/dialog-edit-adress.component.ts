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
  selector: 'app-dialog-edit-adress',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogActions, MatDialogContent, MatDialogTitle, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule, ReactiveFormsModule],
  templateUrl: './dialog-edit-adress.component.html',
  styleUrl: './dialog-edit-adress.component.scss'
})


@Injectable({
  providedIn: 'root'
})
export class DialogEditAdressComponent {

  firestore = inject(Firestore);
  user: User = new User();
  failedAnswer = 'Please fill out all fields';
  findUserId:any = '';
  @ViewChild('failed') failed: any | ElementRef;
  @ViewChild('street') street: any | ElementRef;
  @ViewChild('zipcode') zip: any | ElementRef;
  @ViewChild('city') city: any | ElementRef;
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
      this.checkZip();
    }else{
      this.failedShow('flex', 'Please fill out all fields');
    }
  }

  checkInput(){
    return this.user.street && this.user.zipCode && this.user.city ? true : false;
  }

  checkZip(){
    if(this.checkZipCode(this.user.zipCode)){
      this.failedShow('none', '');
      this.updateAdress();
      this.closeDialog();
    }else{
      this.failedShow('flex', 'The zip code can only consist of numbers');
    }
  }

  checkZipCode(code:any){
    return /^-?\d+$/.test(code);
  }

  failedShow(see:string, answer:string){
    this.failedAnswer = answer;
    this.failed.nativeElement.setAttribute('style', 'display:'+see+';');
    this.street.nativeElement.setAttribute('style', this.user.street ? 'color: unset' : 'color: red !important;');
    this.zip.nativeElement.setAttribute('style', this.user.zipCode && this.checkZipCode(this.user.zipCode) ? 'color: unset' : 'color: red !important;');
    this.city.nativeElement.setAttribute('style', this.user.city ? 'color: unset' : 'color: red !important;');
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