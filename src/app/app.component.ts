import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatToolbarModule, MatSidenavModule, MatIconModule, RouterModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'simpleCRM';
  open = true;
  name: boolean = true;

  @ViewChild('drawer') drawer: any;
  @ViewChild('site') site: ElementRef | any;
  @ViewChild('name') siteName: ElementRef | any;
  
  constructor(private router: Router){}

  changeWidth(){
    setTimeout(() => this.site.nativeElement.setAttribute('style', this.drawer.opened == true ? 'max-width:1140px' : 'max-width:1440px'), 250);
    setTimeout(() => this.siteName.nativeElement.setAttribute('style', this.drawer.opened == true ? 'display: none; transition: all 1000ms ease-in-out;' : 'display: flex; transition: all 1000ms ease-in-out;'), 250);
  }

  changeSite(siteUrl: any){
      this.site.nativeElement.setAttribute('style', 'transform: translateX(100vw)');
      setTimeout(() => {
        this.router.navigate([siteUrl]); 
      }, 250);
      setTimeout(() => this.site.nativeElement.setAttribute('style', 'transform: translateX(0)'), 400);
  }
}
