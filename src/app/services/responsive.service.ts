import { Injectable } from '@angular/core';
import { BreakpointObserver, Breakpoints, LayoutModule } from '@angular/cdk/layout'
import { ScreenSizeType } from '../model/utils';

@Injectable({
  providedIn: 'root'
})
export class ResponsiveService {
  private _screenSize = ScreenSizeType.Unknown;
  public get screenSize(): ScreenSizeType {
    return this._screenSize;
  }

  private readonly screenSizeBreakpoints = new Map([
    [Breakpoints.XSmall, ScreenSizeType.XSmall],
    [Breakpoints.Small, ScreenSizeType.Small],
    [Breakpoints.Medium, ScreenSizeType.Medium],
    [Breakpoints.Large, ScreenSizeType.Large],
    [Breakpoints.XLarge, ScreenSizeType.XLarge]
  ]);

  private checkScreenSize(_breakpointObserver: BreakpointObserver): void {
    _breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
      ])
      .subscribe((result: any) => {
        for (let query of Object.keys(result.breakpoints)) {
          if (result.breakpoints[query]) {
            this._screenSize = this.screenSizeBreakpoints.get(query) ?? ScreenSizeType.Unknown;
          }
        }
      });
  }

  constructor(private _breakpointObserver: BreakpointObserver) {
    this.checkScreenSize(_breakpointObserver);
  }
}
