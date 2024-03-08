import { Component, input } from '@angular/core';
import { LogEntryComponent } from './log-entry/log-entry.component';

@Component({
  selector: 'pbs-event-log',
  standalone: true,
  imports: [LogEntryComponent],
  template: `
    <div class="title">Event Log</div>
    <div class="logs">
      @for(log of logs(); track log.time) {
      <pbs-log-entry [logEntry]="log" />
      } @empty { no events }
    </div>
  `,
  styleUrl: './event-log.component.scss',
})
export class EventLogComponent {
  logs = input([], {
    transform: (logs: { time: number; message: string }[]) =>
      logs
        .map((log, index, loggings) => {
          const diff = index ? log.time - loggings[index - 1].time : undefined;
          return { ...log, diff };
        })
        .reverse(),
  });
}
