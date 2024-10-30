import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
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

  @ViewChild('router-outlet') site: ElementRef | any;
  
  changeSite(){
      this.site.nativeElement.setAttrbute('style', 'transform: translateX(100vh)');
      setTimeout(() => this.site.nativeElement.setAttrbute('style', 'transform: translateX(0)'), 1000);
  }
}
