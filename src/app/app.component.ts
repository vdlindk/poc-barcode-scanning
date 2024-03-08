import { AfterViewInit, Component, computed, viewChild } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { SidenavService } from './common/services/sidenav.service';

@Component({
  selector: 'pbs-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatSidenavModule,
    MatListModule,
    MatToolbarModule,
    RouterLink,
    RouterLinkActive,
  ],
  template: `
    <mat-sidenav-container class="pbs-sidenav-container">
      <mat-sidenav
        #sidenav
        [mode]="sideNavMode()"
        [opened]="!isSmallScreen()"
        class="pbs-sidenav"
      >
        <mat-toolbar color="primary">POC barcode scanning</mat-toolbar>
        <mat-nav-list>
          <a
            mat-list-item
            [routerLink]="['zxing']"
            routerLinkActive="mdc-list-item--activated"
            >&#64;zxing/ngx-scanner</a
          >
          <a
            mat-list-item
            [routerLink]="['html5-qrcode']"
            routerLinkActive="mdc-list-item--activated"
            >Html5-QRCode</a
          >
        </mat-nav-list>
      </mat-sidenav>
      <mat-sidenav-content class="pbs-sidenav-content">
        <router-outlet></router-outlet>
      </mat-sidenav-content>
    </mat-sidenav-container>
  `,
  styleUrl: './app.component.scss',
})
export class AppComponent implements AfterViewInit {
  isSmallScreen = this.sidenavService.isSmallScreen;
  sideNavMode = computed(() => (this.isSmallScreen() ? 'over' : 'side'));
  private sideNav = viewChild.required(MatSidenav);

  constructor(private readonly sidenavService: SidenavService) {}

  ngAfterViewInit(): void {
    this.sidenavService.sideNav = this.sideNav();
  }
}
