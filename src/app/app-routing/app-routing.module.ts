import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecipesComponent } from '../recipe_book_feature/recipes/recipes.component';
import { RecipeDetailComponent } from '../recipe_book_feature/recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipe_book_feature/recipes/recipe-edit/recipe-edit.component';
import { ShoppingListComponent } from '../shopping_list_feature/shopping-list/shopping-list.component';
import { ErrorPageComponent } from '../error-page/error-page.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes',pathMatch: 'full'  },
  {
    path: 'recipes', component: RecipesComponent, children: [
      { path: ':name', component: RecipeDetailComponent },
      { path: ':name/edit', component: RecipeEditComponent }
    ]
  },
  { path: 'shoppingList', component: ShoppingListComponent },
  { path: 'not-found', component: ErrorPageComponent, data: { message: 'Page not found!' } },
  { path: '**', redirectTo: '/not-found' }
];


@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }