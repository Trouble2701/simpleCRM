import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
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

@Component({
  selector: 'app-dialog-add-user',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatDialogContent, FormsModule, MatFormFieldModule, MatDialogActions, MatButtonModule, MatInputModule, MatDialogTitle, MatDatepickerModule],
  templateUrl: './dialog-add-user.component.html',
  styleUrl: './dialog-add-user.component.scss'
})
export class DialogAddUserComponent implements OnInit {

  user = new User();
  birthDate: any;

  constructor() {}
  ngOnInit(): void {

  }

  saveUser() {
    this.user.birthDate = this.birthDate.getTime();
    console.log("Current User is", this.user);
  }
}
