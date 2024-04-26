import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ErrorPageComponent } from '../error-page/error-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', loadChildren: () => import('./../auth/auth.module').then(m => m.AuthModule) },
  { path: 'shoppingList', loadChildren: () => import('./../shopping_list_feature/shopping-list/shopping-list.module').then(m => m.ShoppingListModule) },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },

];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }