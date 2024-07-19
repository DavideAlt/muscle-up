import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BodymapComponent } from './bodymap.component';

describe('BodymapComponent', () => {
  let component: BodymapComponent;
  let fixture: ComponentFixture<BodymapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BodymapComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BodymapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
