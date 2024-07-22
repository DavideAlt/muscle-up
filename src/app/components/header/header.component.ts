import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveService } from '../../services/responsive.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'mu-header',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  public activeLink: string = '';
  public isSearchActive: boolean = false;
  public hasScrolled: boolean = false;

  constructor(
    public responsiveService: ResponsiveService,
    private _router: Router
  ) {
    //
  }
  
  ngOnInit(): void {
    this._router.events.subscribe((ev) => {
      if (ev instanceof NavigationEnd) {
        this.activeLink = ev.urlAfterRedirects;
      }
    });
  }
  
  public toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    const offset = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.hasScrolled = offset > 50;
  }

  public goToHome() {
    this._router.navigate(['/home']);
  }
  
  public goToTools() {
    this._router.navigate(['/tools']);
  }
  
  public goToExercises() {
    this._router.navigate(['/exercises']);
  }
  
  public goToAbout() {
    this._router.navigate(['/about']);
  }
}
