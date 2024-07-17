import { Component, HostListener, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResponsiveService } from '../../services/responsive.service';

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
  public isSearchActive: boolean = false;
  public hasScrolled: boolean = false;

  constructor(public responsiveService: ResponsiveService) {
    //
  }
  
  ngOnInit(): void {
    //
  }

  
  public toggleSearch(): void {
    this.isSearchActive = !this.isSearchActive;
  }

  @HostListener('window:scroll')
  public onWindowScroll(): void {
    console.log('asd');
    
    const offset = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    this.hasScrolled = offset > 50;
    console.log(this.hasScrolled);
    
  }
}
