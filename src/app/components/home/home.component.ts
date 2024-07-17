import { Component } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
  selector: 'mu-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public responsiveService: ResponsiveService) {
    //
  }
}
