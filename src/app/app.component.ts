import { AfterContentChecked, AfterViewInit, Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    FooterComponent,
    HomeComponent,
    HeaderComponent,
    RouterOutlet
           ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements AfterContentChecked {

  constructor(
    private _router: Router,
    private _viewportScroller: ViewportScroller
  ) {
    //
  }
  ngAfterContentChecked(): void {
    this._router.events.subscribe(ev => {
      if (ev instanceof NavigationEnd) {
        this._viewportScroller.scrollToPosition([0, 0]);
        window.dispatchEvent(new Event('resize'));
      }
    })
  }
  
}
