import { Component } from '@angular/core';
import { ToolbarComponent } from '../../common/components/scan-layout/toolbar/toolbar.component';
import { ScanLayoutComponent } from '../../common/components/scan-layout/scan-layout.component';

@Component({
  selector: 'pbs-html5-qrcode',
  standalone: true,
  imports: [ScanLayoutComponent],
  template: ` <pbs-scan-layout [title]="title"></pbs-scan-layout> `,
  styleUrl: './html5-qrcode.page.scss',
})
export class Html5QrcodePage {
  title = {
    title: 'Html5-QRCode',
    url: 'https://www.npmjs.com/package/html5-qrcode',
  };
}
