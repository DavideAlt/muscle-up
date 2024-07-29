import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, Input, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
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

  private _tooltip!: HTMLElement | null;

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
    this.createTooltip();
    if (this.bodyMapContainer.nativeElement) {
      const svgElement = this.bodyMapContainer.nativeElement.querySelector('svg');
      if (svgElement) {
        const regions = svgElement.querySelectorAll('g');
        regions.forEach((region: Element) => {
          this._renderer.setStyle(region, 'fill', '#8ECAE6');

          this._renderer.listen(region, 'mouseover', (ev) => {
            const regionId = region.getAttribute('id');
            if (regionId) {
              this.showTooltip(regionId, ev.clientX, ev.clientY);
              this._renderer.setStyle(region, 'fill', '#FFB703');
            }
          });

          this._renderer.listen(region, 'mousemove', (event) => {
            this.updateTooltipPosition(event.clientX, event.clientY);
          });

          this._renderer.listen(region, 'mouseout', () => {
            this.hideTooltip();
            this._renderer.setStyle(region, 'fill', '#8ECAE6');
          });

          this._renderer.listen(region, 'click', () => {
            this.hideTooltip()
            const id = region.getAttribute('id');
            if (id !== 'body') {
              this.removeTooltip();
              this._router.navigate([`/exercises/${id}`]);
            }
          });
        });
      }
    }
  }
  private createTooltip(): void {
    this._tooltip = this._renderer.createElement('div');
    this._renderer.setAttribute(this._tooltip, 'class', 'tooltip');
    this._renderer.setStyle(this._tooltip, 'position', 'absolute');
    this._renderer.setStyle(this._tooltip, 'backgroundColor', 'rgba(0, 0, 0, 0.75)');
    this._renderer.setStyle(this._tooltip, 'color', '#fff');
    this._renderer.setStyle(this._tooltip, 'padding', '5px');
    this._renderer.setStyle(this._tooltip, 'borderRadius', '3px');
    this._renderer.setStyle(this._tooltip, 'pointerEvents', 'none');
    this._renderer.setStyle(this._tooltip, 'visibility', 'hidden');
    this._renderer.setStyle(this._tooltip, 'zIndex', '1000');
    this._renderer.appendChild(document.body, this._tooltip);
  }

  private showTooltip(regionId: string, x: number, y: number): void {
    if (regionId !== 'body') {
      this._renderer.setProperty(this._tooltip, 'textContent', regionId);
      this._renderer.setStyle(this._tooltip, 'visibility', 'visible');
      this._renderer.setStyle(this._tooltip, 'top', `${y}px`);
      this._renderer.setStyle(this._tooltip, 'left', `${x}px`);
    }
    this.updateTooltipPosition(x, y);
  }

  private hideTooltip(): void {
    this._renderer.setStyle(this._tooltip, 'visibility', 'hidden');
  }

  private updateTooltipPosition(x: number, y: number): void {
    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;
    this._renderer.setStyle(this._tooltip, 'top', `${y + 10 + scrollY}px`);
    this._renderer.setStyle(this._tooltip, 'left', `${x + 10 + scrollX}px`);
  }

  private removeTooltip(): void {
    if (this._tooltip) {
      const tooltips = document.querySelectorAll('.tooltip');
      tooltips.forEach(tooltip => {
        this._renderer.removeChild(tooltip.parentNode, tooltip);
      });
    }
  }
  
}
