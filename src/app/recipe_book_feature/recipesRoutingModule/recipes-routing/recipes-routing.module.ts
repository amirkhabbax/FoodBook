import { NgModule } from '@angular/core';
import { RecipeDetailComponent } from '../../recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../../recipes/recipe-edit/recipe-edit.component';
import { RecipesComponent } from '../../recipes/recipes.component';
import { RecipesResolver } from '../../services/recipe.service';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, children:
      [
        { path: 'new', component: RecipeEditComponent },
        { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolver] },
        { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolver] },
      ]
  },
  { path: '**', redirectTo: '/not-found' }
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class RecipesRoutingModule { }
