import { Component, inject, OnInit, Injectable, ViewChild, ElementRef } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../moduls/user.class';
import { MatCardModule } from '@angular/material/card';
import { collection, Firestore, onSnapshot, query, orderBy } from '@angular/fire/firestore';
import { Router } from '@angular/router';

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
  userId: string[] = [];
  unsubUser;

  @ViewChild('userList') userList: any | ElementRef;

  constructor(public dialog: MatDialog, private router: Router){
    this.unsubUser = this.subUser();
  }

  ngonDestroy() {
    this.unsubUser();
  }

  subUser() {
    const q = query(this.getUsersRef(), orderBy("firstName"), orderBy("lastName"));
    return onSnapshot(q, (list) => {
      this.users = [];
      this.userId = [];
      list.forEach(element => {
        this.users.push(element.data());
        this.userId.push(element.id);
      })
//      console.log(this.userId);
//      console.log(this.users);
    });
  }

  ngOnInit(){

  }

  openUser(index:number){
    console.log(this.userId[index]);
    //this.userList.nativeElement.setAttribute('style', 'transform: translateX(100vw)');
    this.router.navigate(['/user/' + this.userId[index]]);
  }

  openDialog(){
    this.dialog.open(DialogAddUserComponent);
  }

  getUsersRef() {
    return collection(this.firestore, 'users');
  }
}
