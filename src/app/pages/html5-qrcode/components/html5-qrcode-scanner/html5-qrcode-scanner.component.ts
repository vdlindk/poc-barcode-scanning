import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  Output,
} from '@angular/core';
import { Html5Qrcode } from 'html5-qrcode';

@Component({
  selector: 'pbs-html5-qrcode-scanner',
  standalone: true,
  imports: [],
  template: ` <div id="html5-qrcode-scanner"></div>`,
  styleUrl: './html5-qrcode-scanner.component.scss',
})
export class Html5QrcodeScannerComponent implements AfterViewInit, OnDestroy {
  @Output() scanSuccess = new EventEmitter<string>();
  @Output() autoStarted = new EventEmitter<void>();
  @Output() scanFailure = new EventEmitter<string>();

  private html5Qrcode: Html5Qrcode | undefined;

  async ngAfterViewInit() {
    const devices = await Html5Qrcode.getCameras();
    if (devices.length === 0) {
      this.scanFailure.emit('No cameras found');
      return;
    } else {
      const cameraId = devices[0].id;
      this.html5Qrcode = new Html5Qrcode('html5-qrcode-scanner');
      await this.html5Qrcode.start(
        cameraId,
        {
          fps: 4,
          qrbox: 250,
        },
        (decodedText: string) => {
          this.scanSuccess.emit(decodedText);
        },
        (errorMessage: string) => {
          this.scanFailure.emit(errorMessage);
        }
      );
      // FIXME find a better way to determine that the scanner has started
      this.autoStarted.emit();
    }
  }

  async ngOnDestroy() {
    await this.html5Qrcode?.stop();
    await this.html5Qrcode?.clear();
  }
}
