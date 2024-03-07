import { NgClass } from '@angular/common';
import { Component, computed, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SidenavService } from '../../../services/sidenav.service';
import { ToolbarTitle } from './toolbar-title.type';

@Component({
  selector: 'pbs-toolbar',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, NgClass],
  template: `
    <mat-toolbar color="primary">
      <span>{{ title().title }}</span>
      @if(title().url) {
      <a
        [href]="title().url"
        target="_blank"
        rel="noopener"
        class="toolbar-link"
      >
        <mat-icon>open_in_new</mat-icon>
      </a>
      }
      <button
        mat-button
        (click)="toggleSidenav()"
        class="sidebar-toggle"
        [ngClass]="$buttonClass()"
      >
        <mat-icon>menu</mat-icon>
      </button>
    </mat-toolbar>
  `,
  styleUrl: './toolbar.component.scss',
})
export class ToolbarComponent {
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

  $buttonClass = computed(() =>
    this.sideNavService.$isSmallScreen()
      ? 'sidebar-toggle-visible'
      : 'sidebar-toggle-hidden'
  );
  constructor(private readonly sideNavService: SidenavService) {}

  toggleSidenav() {
    this.sideNavService.toggle();
  }
}
