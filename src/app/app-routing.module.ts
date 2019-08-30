import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
    path: 'home',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
})
export class AppRoutingModule {}
