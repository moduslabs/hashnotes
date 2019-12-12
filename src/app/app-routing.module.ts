import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    loadChildren: () =>
      import('../views/main/main.module').then((m) => m.MainPageModule),
    path: '',
    pathMatch: 'full',
  },
];

@NgModule({
  exports: [RouterModule],
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppRoutingModule {}
