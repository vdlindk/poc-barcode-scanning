import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScanLayoutComponent } from './scan-layout.component';

describe('ScanLayoutComponent', () => {
  let component: ScanLayoutComponent;
  let fixture: ComponentFixture<ScanLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScanLayoutComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScanLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
