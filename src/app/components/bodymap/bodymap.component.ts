import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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
    private _renderer: Renderer2
  ) {}

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
        const paths = svgElement.querySelectorAll('g');
        paths.forEach((path: Element) => {
          this._renderer.setStyle(path, 'fill', '#8ECAE6');
          this._renderer.listen(path, 'mouseover', () => this.onPathMouseOver(path));
          this._renderer.listen(path, 'mouseout', () => this.onPathMouseOut(path));
          this._renderer.listen(path, 'click', () => this.onPathClick(path));
        });
      }
    }
  }

  private onPathMouseOver(path: Element): void {
    this._renderer.setStyle(path, 'fill', '#FFB703');
  }

  private onPathMouseOut(path: Element): void {
    this._renderer.setStyle(path, 'fill', '#8ECAE6');
  }

  private onPathClick(path: Element): void {
    const id = path.getAttribute('id');
    console.log('Clicked ID:', id);
    /* TO-DO: REINDIRIZZARE ALLA PAGINA ESERCIZI DEL GRUPPO MUSCOLARE CLICKATO ----- ATTENTO CHE NON SIA ID='BODY' */
  }
  
}
