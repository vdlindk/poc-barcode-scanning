import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Html5QrcodePage } from './html5-qrcode.page';

describe('Html5QrcodePage', () => {
  let component: Html5QrcodePage;
  let fixture: ComponentFixture<Html5QrcodePage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Html5QrcodePage]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Html5QrcodePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
