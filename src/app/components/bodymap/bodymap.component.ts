import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'mu-bodymap',
  standalone: true,
  imports: [],
  template: '<div #bodyMapContainer [innerHTML]="svgBodyMap"></div>',
  styleUrls: ['./bodymap.component.scss']
})
export class BodymapComponent implements OnInit{

  @Input() public name?: string;

  public svgBodyMap?: SafeHtml;

  @ViewChild('bodyMapContainer', { static: false }) bodyMapContainer!: ElementRef;

  constructor(
    private _httpClient: HttpClient,
    private _sanitizer: DomSanitizer,
    private _renderer: Renderer2,
    private _router: Router
  ) {
    //
  }

  ngOnInit(): void {
    if (!this.name) {
      this.svgBodyMap = '';
      return;
    }

    this._httpClient
      .get(`../../../assets/bodymaps/${this.name}.svg`, { responseType: 'text' })
      .subscribe(value => {
        this.svgBodyMap = this._sanitizer.bypassSecurityTrustHtml(value);
        setTimeout(() => this.applyStyling(), 0);
      });
  }

  public applyStyling(): void {
    if (this.bodyMapContainer.nativeElement) {
      const svgElement = this.bodyMapContainer.nativeElement.querySelector('svg');
      if (svgElement) {
        const regions = svgElement.querySelectorAll('g');
        regions.forEach((region: Element) => {
          this._renderer.setStyle(region, 'fill', '#8ECAE6');
          this._renderer.listen(region, 'mouseover', () => this.onRegionMouseOver(region));
          this._renderer.listen(region, 'mouseout', () => this.onRegionMouseOut(region));
          this._renderer.listen(region, 'click', () => this.onRegionClick(region));
        });
      }
    }
  }

  private onRegionMouseOver(region: Element): void {
    this._renderer.setStyle(region, 'fill', '#FFB703');
  }

  private onRegionMouseOut(region: Element): void {
    this._renderer.setStyle(region, 'fill', '#8ECAE6');
  }

  private onRegionClick(region: Element): void {
    const id = region.getAttribute('id');
    console.log('Clicked ID:', id);
    /* TO-DO: REINDIRIZZARE ALLA PAGINA ESERCIZI DEL GRUPPO MUSCOLARE CLICKATO ----- ATTENTO CHE NON SIA ID='BODY' */
    this._router.navigate([`/exercises/${id}`]);
  }
  
}
