import { DatePipe } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
  selector: 'pbs-log-entry',
  standalone: true,
  imports: [DatePipe],
  template: `
    <div class="message">{{ logEntry().message }}</div>
    @if(logEntry().diff) {
    <div class="time">+{{ logEntry().diff | date : 'mm:ss.SSS' }}</div>
    }
  `,
  styleUrl: './log-entry.component.scss',
})
export class LogEntryComponent {
  logEntry = input.required<{ time: number; message: string; diff?: number }>();
}
