import {
  Component,
  EventEmitter,
  OnDestroy,
  Output,
  computed,
  effect,
  input,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { EventLogService } from '../../services/event-log.service';
import { EventLogComponent } from './event-log/event-log.component';
import { ToolbarTitle } from './toolbar/toolbar-title.type';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'pbs-scan-layout',
  standalone: true,
  imports: [
    ToolbarComponent,
    MatIconModule,
    MatButtonModule,
    EventLogComponent,
  ],
  template: `
    <pbs-toolbar [title]="title()"></pbs-toolbar>
    <div class="scanner">
      <div class="scanner-area">
        <ng-content></ng-content>
        @if(scanResult()) {
        <div class="scanner-result">
          <div>
            <span class="scanner-result__small">Result</span>
            <span class="scanner-result__strong">{{ scanResult() }}</span>
          </div>
          <button mat-icon-button (click)="clearResult()">&times;</button>
        </div>
        }
      </div>
      <div class="scanner-events">
        @if(hasLogs()) {
        <pbs-event-log [logs]="logs()" />
        }
      </div>
      @if(hasLogs()) {
      <button
        class="log-clear"
        mat-fab
        color="primary"
        aria-label="Example icon button with a delete icon"
        (click)="clearLogs()"
      >
        <mat-icon>delete</mat-icon>
      </button>
      }
    </div>
  `,
  styleUrl: './scan-layout.component.scss',
})
export class ScanLayoutComponent implements OnDestroy {
  scanResult = input<string>();
  scannerReady = input<boolean>(false);
  title = input(
    { title: '' },
    {
      transform: (v: string | ToolbarTitle | undefined | null) => {
        const nonNullishTitle = v ?? '';
        if (typeof nonNullishTitle === 'string') {
          return { title: nonNullishTitle } as ToolbarTitle;
        } else {
          return nonNullishTitle;
        }
      },
    }
  );
  @Output() scanResultClear = new EventEmitter<void>();
  logs = this.eventLogService.logs;
  hasLogs = computed(() => this.logs().length > 0);

  constructor(private readonly eventLogService: EventLogService) {
    effect(() => {
      const title = this.title().title;
      if (this.scanResult()) {
        this.eventLogService.log(`${title} - Scanned:  ${this.scanResult()}`);
      }
    });
    effect(() => {
      const title = this.title().title;
      if (this.scannerReady()) {
        this.eventLogService.log(`${title} - Scanner ready`);
      }
    });
  }

  clearResult = () => {
    const title = this.title().title;
    this.eventLogService.log(`${title} -Scan result cleared`);
    this.scanResultClear.emit();
  };

  ngOnDestroy(): void {
    const title = this.title().title;
    this.eventLogService.log(`${title} - destroyed`);
  }

  clearLogs() {
    this.eventLogService.clear();
  }
}
