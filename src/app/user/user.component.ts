import { Component, inject, OnInit, Injectable } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatDialog} from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../moduls/user.class';
import {MatCardModule} from '@angular/material/card';
import { collection, Firestore, doc, onSnapshot, addDoc, updateDoc, deleteDoc, query, where, limit, orderBy } from '@angular/fire/firestore';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule, MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})

@Injectable({
  providedIn: 'root'
})
export class UserComponent implements OnInit {

  user = new User();
  firestore = inject(Firestore);
  users: any[] = [];
  unsubUser;

  constructor(public dialog: MatDialog){
    this.unsubUser = this.subUser();
  }

  ngonDestroy() {
    this.unsubUser();
  }

  subUser() {
    const q = query(this.getUsersRef(), orderBy("firstName"), orderBy("lastName"));
    return onSnapshot(q, (list) => {
      this.users = [];
      list.forEach(element => {
        this.users.push(element.data());
        console.log(this.users);
      })
    });
  }

  ngOnInit(){

  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }
}
