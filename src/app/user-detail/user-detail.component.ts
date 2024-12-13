import { Component, ElementRef, ViewChild, Injectable, inject, input, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';
import { collection, Firestore, doc, onSnapshot, addDoc, updateDoc, deleteDoc, query, where, limit, orderBy } from '@angular/fire/firestore';
import { User } from '../../moduls/user.class';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditAdressComponent } from '../dialog-edit-adress/dialog-edit-adress.component';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditContactComponent } from '../dialog-edit-contact/dialog-edit-contact.component';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatCardModule, MatMenuModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class UserDetailComponent {

  firestore = inject(Firestore);
  siteSlide = inject(AppComponent);
  userId = '';
  users: User = new User;
  company: any;
  companyAdress: any;
  bDay: string = '';

  unsubUserId;
  unsubUserDetails;

  @ViewChild('userInfo') userInfo: any | ElementRef;
  @ViewChild('companyCheck') companySet: any | ElementRef;

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.unsubUserId = this.subUserId();
    this.unsubUserDetails = this.subUserDetails();
    this.slideIn();
  }

  companyCheck() {
    this.companyAdress = this.users.company == 'Private' ? '' : this.users.company;
    this.company = this.users.company == 'Private' ? this.users.company : 'Company ';
    this.companySet.nativeElement.setAttribute('style', this.users.company == 'Private' ? 'display:none' : 'display:flex');
  }

  ngonDestroy() {
    this.unsubUserId();
    this.unsubUserDetails();
  }

  subUserId() {
    return this.userId = this.route.snapshot.params['id'];
  }

  subUserDetails() {
    return onSnapshot(this.getUsersRef(), (list) => {
      this.users = new User(list.data());
      this.companyCheck();
      this.birthDate();
    });
  }

  userDetailEdit() {
    this.dialog.open(DialogEditUserComponent);
  }

  userAdressEdit() {
    this.dialog.open(DialogEditAdressComponent);
  }

  userContactEdit(){
    this.dialog.open(DialogEditContactComponent);
  }

  birthDate() {
    let today = new Date(this.users.birthDate);
    let yyyy = today.getFullYear();
    let mm:any = today.getMonth() + 1;
    let dd:any = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    this.bDay = dd + '.' + mm + '.' + yyyy;
  }

  slideIn() {
    setTimeout(() => this.userInfo.nativeElement.setAttribute('style', 'transform: translateX(0)'), 50);
  }

  backToList() {
    this.siteSlide.changeSite('/user');
  }

  getUsersRef() {
    return doc(collection(this.firestore, 'users'), this.userId);
  }
}
