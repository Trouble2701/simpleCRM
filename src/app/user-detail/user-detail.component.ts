import { Component, ElementRef, ViewChild, Injectable, inject, input, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { Router, ActivatedRoute } from '@angular/router';
import { collection, Firestore, doc, onSnapshot, addDoc, updateDoc, deleteDoc, query, where, limit, orderBy } from '@angular/fire/firestore';
import { User } from '../../moduls/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatCardModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})

@Injectable({
  providedIn: 'root'
})

export class UserDetailComponent {

  firestore = inject(Firestore);
  userId = '';
  users: User = new User;

  unsubUserId;
  unsubUserDetails;

  @ViewChild('userInfo') userInfo: any | ElementRef;

  constructor(private router: Router, private route: ActivatedRoute) {
    this.unsubUserId = this.subUserId();
    this.unsubUserDetails = this.subUserDetails();
    this.slideIn();
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
      //console.log('user List:', this.users);
    });
  }

  slideIn() {
    setTimeout(() => this.userInfo.nativeElement.setAttribute('style', 'transform: translateX(0)'), 50);
  }

  backToList() {
    this.userInfo.nativeElement.setAttribute('style', 'transform: translateX(100vw)')
    setTimeout(() => this.router.navigate(['/user']), 250);
  }

  getUsersRef() {
    return doc(collection(this.firestore, 'users'), this.userId);
  }
}
