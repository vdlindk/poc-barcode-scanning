import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Html5QrcodeScannerComponent } from './html5-qrcode-scanner.component';

describe('Html5QrcodeScannerComponent', () => {
  let component: Html5QrcodeScannerComponent;
  let fixture: ComponentFixture<Html5QrcodeScannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Html5QrcodeScannerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Html5QrcodeScannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
