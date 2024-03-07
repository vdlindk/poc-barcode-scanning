import { Routes } from '@angular/router';

const homePath = 'zxing';

export const routes: Routes = [
  { path: '', redirectTo: homePath, pathMatch: 'full' },
  {
    path: 'zxing',
    loadComponent: () =>
      import('./pages/zxing/zxing.page').then((page) => page.ZxingPage),
  },
  {
    path: 'html5-qrcode',
    loadComponent: () =>
      import('./pages/html5-qrcode/html5-qrcode.page').then(
        (page) => page.Html5QrcodePage
      ),
  },
  {
    path: '**',
    redirectTo: homePath,
  },
];
