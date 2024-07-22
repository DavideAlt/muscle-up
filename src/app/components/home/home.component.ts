import { Component } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';
import { BodymapComponent } from "../bodymap/bodymap.component";

@Component({
  selector: 'mu-home',
  standalone: true,
  imports: [
    BodymapComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  constructor(public responsiveService: ResponsiveService) {
    //
  }

}
