import { Injectable, computed, signal } from '@angular/core';

type Logging = Readonly<{
  type: 'log';
  time: number; // milliseconds since LogStart
  message: string;
}>;

type LogStart = Readonly<{
  type: 'start';
  timestamp: Date;
}>;

type EventLog = Logging | LogStart;

@Injectable({
  providedIn: 'root',
})
export class EventLogService {
  private logEntries = signal<EventLog[]>([this.getStartEventLog()]);

  logs = computed(() =>
    this.logEntries()
      .filter((value): value is Logging => value.type === 'log')
      .map(({ type, ...result }) => ({ ...result }))
  );

  constructor() {}

  log(message: string) {
    this.updateLogs((logs) => {
      const logStart = logs[0] as LogStart;
      const time = new Date().getTime() - logStart.timestamp.getTime();

      return [...logs, { type: 'log', time, message }];
    });
  }

  clear() {
    this.updateLogs(() => [this.getStartEventLog()]);
  }

  private getStartEventLog(): LogStart {
    return { type: 'start', timestamp: new Date() };
  }

  /**
   * This is a hack to bypass the Angular runtime check 'NG0600: Writing to signals is not allowed in a computed or an effect'.
   * It uses setTimeout to delay the update of logEntries, allowing it to be set from effects.
   */
  private updateLogs(updateFn: Parameters<typeof this.logEntries.update>[0]) {
    setTimeout(() => {
      this.logEntries.update(updateFn);
    }, 0);
  }
}
