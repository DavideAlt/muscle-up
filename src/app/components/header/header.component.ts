import { Component, OnInit } from '@angular/core';
import { ResponsiveService } from '../../services/responsive.service';

@Component({
  selector: 'mu-header',
  standalone: true,
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  public isSearchActive: boolean = false;

  constructor(public responsiveService: ResponsiveService) {
    //
  }
  
  ngOnInit(): void {
    //
  }

}
