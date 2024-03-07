import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZxingPage } from './zxing.page';

describe('ZxingPage', () => {
  let component: ZxingPage;
  let fixture: ComponentFixture<ZxingPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZxingPage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ZxingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
