import { Component, input } from '@angular/core';
import { ToolbarTitle } from './toolbar/toolbar-title.type';
import { ToolbarComponent } from './toolbar/toolbar.component';

@Component({
  selector: 'pbs-scan-layout',
  standalone: true,
  imports: [ToolbarComponent],
  template: ` <pbs-toolbar [title]="title()"></pbs-toolbar> `,
  styleUrl: './scan-layout.component.scss',
})
export class ScanLayoutComponent {
  title = input<string | ToolbarTitle | undefined | null>({
    title: '',
  });
}
