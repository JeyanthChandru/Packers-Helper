import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'new-move',
    loadChildren: () => import('./pages/new-move/new-move.module').then( m => m.NewMovePageModule)
  },
  {
    path: 'new-shared-move',
    loadChildren: () => import('./pages/new-shared-move/new-shared-move.module').then( m => m.NewSharedMovePageModule)
  },
  {
    path: 'open-move',
    loadChildren: () => import('./pages/open-move/open-move.module').then( m => m.OpenMovePageModule)
  },
  {
    path: 'new-box',
    loadChildren: () => import('./pages/new-box/new-box.module').then( m => m.NewBoxPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
