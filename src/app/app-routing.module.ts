import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
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
    path: 'new-box',
    loadChildren: () => import('./pages/new-box/new-box.module').then( m => m.NewBoxPageModule)
  },
  {
    path: 'open-move',
    loadChildren: () => import('./pages/open-move/open-move.module').then(m => m.OpenMovePageModule)
  },
  {
    path: 'open-shared-move',
    loadChildren: () => import('./pages/open-shared-move/open-shared-move.module').then( m => m.OpenSharedMovePageModule)
  },
  {
    path: 'open-box',
    loadChildren: () => import('./pages/open-box/open-box.module').then( m => m.OpenBoxPageModule)
  },
  {
    path: 'open-shared-box',
    loadChildren: () => import('./pages/open-shared-box/open-shared-box.module').then( m => m.OpenSharedBoxPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./pages/register/register.module').then( m => m.RegisterPageModule)
  },
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
