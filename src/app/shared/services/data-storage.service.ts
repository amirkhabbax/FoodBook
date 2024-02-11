import { Ingredient } from './../model/Ingredient.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, tap } from 'rxjs';
import { Recipe } from 'src/app/recipe_book_feature/recipes/model/recipe.model';
import { RecipeService } from 'src/app/recipe_book_feature/services/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private httpCLient: HttpClient, private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.httpCLient.put("https://maximilliantraining-default-rtdb.firebaseio.com/recipes.json", recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    return this.httpCLient.get<Recipe[]>("https://maximilliantraining-default-rtdb.firebaseio.com/recipes.json")
      .pipe(map(recipes => {
        return recipes.map(recipe => { return { ...recipe, ingredients: recipe.ingredients ? recipe.ingredients : [] } });
      })
        ,
        tap(recipes => {
          //   console.log(response);
          this.recipeService.recipes$ = recipes;
        }))

      ;
  }
}
