import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'mu-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  public activeLink: string = '';

  constructor(
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
