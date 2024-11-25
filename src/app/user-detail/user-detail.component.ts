import { Component, ElementRef, ViewChild } from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTooltipModule} from '@angular/material/tooltip';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTooltipModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  @ViewChild('userInfo') userInfo: any | ElementRef;
  constructor(private router: Router){
    this.slideIn();
  }

  slideIn(){
    setTimeout(() => this.userInfo.nativeElement.setAttribute('style', 'transform: translateX(0)'), 50);
  }

  backToList(){
    //this.changeSite(this.router.navigate(['/user']));
  }
}
