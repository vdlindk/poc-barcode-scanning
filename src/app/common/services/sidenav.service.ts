import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable, computed, effect, untracked } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SidenavService {
  private _sideNav: MatSidenav | undefined;
  set sideNav(sideNav: MatSidenav | undefined) {
    this._sideNav = sideNav;
  }

  private $breakPointState = toSignal(
    this.breakpointObserver.observe([Breakpoints.XSmall]),
    { requireSync: true }
  );

  private $navigation = toSignal(
    this.router.events.pipe(
      filter((routerEvent) => routerEvent instanceof NavigationEnd)
    )
  );

  $isSmallScreen = computed(() => this.$breakPointState().matches);

  constructor(
    private readonly breakpointObserver: BreakpointObserver,
    private readonly router: Router
  ) {
    effect(() => {
      this.$navigation();

      untracked(() => {
        if (this.$isSmallScreen()) {
          this._sideNav?.close();
        }
      });
    });
  }

  toggle() {
    this._sideNav?.toggle();
  }
}
