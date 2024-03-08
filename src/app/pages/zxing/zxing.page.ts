import { Component, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BarcodeFormat } from '@zxing/library';
import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { ScanLayoutComponent } from '../../common/components/scan-layout/scan-layout.component';
import { EventLogService } from '../../common/services/event-log.service';

@Component({
  selector: 'pbs-zxing',
  standalone: true,
  imports: [ScanLayoutComponent, ZXingScannerModule],
  template: `
    <pbs-scan-layout
      [title]="title"
      [scanResult]="scanResult()"
      [scannerReady]="scannerReady()"
      (scanResultClear)="onScanResultClear()"
    >
      <zxing-scanner
        [autostart]="true"
        [formats]="barcodeFormats"
        (scanSuccess)="onScanSuccess($event)"
        (autostarted)="onScannerStarted()"
      />
    </pbs-scan-layout>
  `,
  styleUrl: './zxing.page.scss',
})
export class ZxingPage {
  title = {
    title: '@zxing/ngx-scanner',
    url: 'https://www.npmjs.com/package/@zxing/ngx-scanner',
  };

  barcodeFormats = [
    BarcodeFormat.EAN_13,
    BarcodeFormat.EAN_8,
    BarcodeFormat.CODE_128,
    BarcodeFormat.QR_CODE,
  ];

  scanResult = signal<string>('');
  scannerReady = signal(false);

  constructor(
    private readonly titleService: Title,
    private readonly eventLogService: EventLogService
  ) {
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
