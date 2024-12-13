import { Component, inject, Injectable, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from "@angular/common"
import { MatCardModule } from '@angular/material/card';
import { Router } from '@angular/router';
import { collection, doc, Firestore, onSnapshot, query, orderBy } from '@angular/fire/firestore';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../moduls/user.class';
import { AppComponent } from '../app.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class DashboardComponent {

  firestore = inject(Firestore);
  userId: string[] = [];
  users: User = new User;
  lastCustomer: string = 'No Customer';
  isLastCustomer: boolean = false;
  siteSlide = inject(AppComponent);
  @ViewChild('site') site: ElementRef | any;
  unsubUser;

  constructor(private router: Router) {
    this.unsubUser = this.subUser();
  }

  ngonDestroy() {
    this.unsubUser();
  }

  subUser() {
    const q = query(this.getUsersRef(), orderBy("addDate", "desc"));
    return onSnapshot(q, (list) => {
      this.userId = [];
      list.forEach(element => {
        this.userId.push(element.id);
      })
      this.userId.length > 0 ? this.searchLastId() : '';
    });
  }

  searchLastId() {
    return onSnapshot(this.getLastUserRef(this.userId[0]), (list) => {
      this.users = new User(list.data());
      this.lastCustomer = this.users.firstName + ' ' + this.users.lastName;
      this.isLastCustomer = this.lastCustomer != '' ? true : false;
    });
  }

  allCustomer(site: any) {
    this.siteSlide.changeSite(site)
  }

  goToCustomer() {
    this.siteSlide.changeSite('/user/' + this.userId[0]);
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }

  getLastUserRef(userId: string) {
    return doc(collection(this.firestore, 'users'), userId);
  }
}
