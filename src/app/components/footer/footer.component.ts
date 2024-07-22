import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mu-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(
    private _router: Router
  ) {
    //
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
