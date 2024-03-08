import { Component, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ScanLayoutComponent } from '../../common/components/scan-layout/scan-layout.component';
import { EventLogService } from '../../common/services/event-log.service';
import { Html5QrcodeScannerComponent } from './components/html5-qrcode-scanner/html5-qrcode-scanner.component';

@Component({
  selector: 'pbs-html5-qrcode',
  standalone: true,
  imports: [ScanLayoutComponent, Html5QrcodeScannerComponent],
  template: `
    <pbs-scan-layout
      [title]="title"
      [scanResult]="scanResult()"
      [scannerReady]="scannerReady()"
      (scanResultClear)="onScanResultClear()"
    >
      <pbs-html5-qrcode-scanner
        (scanSuccess)="onScanSuccess($event)"
        (autoStarted)="onScannerStarted()"
      />
    </pbs-scan-layout>
  `,
  styleUrl: './html5-qrcode.page.scss',
})
export class Html5QrcodePage {
  title = {
    title: 'Html5-QRCode',
    url: 'https://www.npmjs.com/package/html5-qrcode',
  };

  scanResult = signal<string>('');
  scannerReady = signal(false);

  constructor(private readonly titleService: Title) {
    this.titleService.setTitle(this.title.title);
  }

  onScanResultClear() {
    this.scanResult.set('');
  }

  onScanSuccess(scanResult: string) {
    this.scanResult.set(scanResult);
  }

  onScannerStarted() {
    this.scannerReady.set(true);
  }
}
