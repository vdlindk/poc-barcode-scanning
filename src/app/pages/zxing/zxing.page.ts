import { Component } from '@angular/core';
import { ScanLayoutComponent } from '../../common/components/scan-layout/scan-layout.component';

@Component({
  selector: 'pbs-zxing',
  standalone: true,
  imports: [ScanLayoutComponent],
  template: ` <pbs-scan-layout [title]="title"></pbs-scan-layout>`,
  styleUrl: './zxing.page.scss',
})
export class ZxingPage {
  title = {
    title: '@zxing/ngx-scanner',
    url: 'https://www.npmjs.com/package/@zxing/ngx-scanner',
  };
}
