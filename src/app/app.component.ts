import { Component, ElementRef, HostListener, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
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
  siteWidth: number = 1440;
  name: boolean = true;
  maxWidth: number = 1000;

  @ViewChild('drawer') drawer: any;
  @ViewChild('site') site: ElementRef | any;
  @ViewChild('name') siteName: ElementRef | any;
  @ViewChild('button') button: ElementRef | any;

  constructor(private router: Router) {
    this.siteWidth = window.innerWidth;
    this.changeSiteWidth();
  }

  changeWidth() {
    setTimeout(() => this.site.nativeElement.setAttribute('style', this.drawer.opened == true ? 'width: calc(100vw - 412px);' : 'width:calc(100vw - 112px);'), 250);
    setTimeout(() => this.siteName.nativeElement.setAttribute('style', this.drawer.opened == true ? 'display: none; transition: all 1000ms ease-in-out;' : 'display: flex; transition: all 1000ms ease-in-out;'), 250);
  }

  setOpenTrue(){
    window.innerWidth > this.maxWidth ? this.open = true : this.drawer.toggle();
  }

  changeSite(siteUrl: any) {
    this.site.nativeElement.setAttribute('style', 'transform: translateX(100vw)');
    setTimeout(() => this.router.navigate([siteUrl]), 250);
    setTimeout(() => this.site.nativeElement.setAttribute('style', 'transform: translateX(0)'), 400);
  }

  @HostListener('window:resize', ['$event.target.innerWidth'])
  onResize(width: any) {
    this.siteWidth = width;
    this.changeSiteWidth();
  }

  changeSiteWidth(){
    this.open = this.siteWidth < this.maxWidth ? false : true;
    this.changeWidth();
  }

  openNav(){
    this.button.nativeElement.setAttribute('style', this.siteWidth < 420 && this.open == true ? 'display: none;' : 'display: flex;');
  }
}