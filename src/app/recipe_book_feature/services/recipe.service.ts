import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/model/recipe.model';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from 'src/app/shared/model/Ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe('Middle Eastern Falafel', 'Learn how to make crispy, delicious Middle Eastern falafel', 'https://www.nonguiltypleasures.com/wp-content/uploads/2023/02/crispy-middle-eastern-falafel-square.jpg', [
      new Ingredient('Pea', 200),
      new Ingredient('Oil', 1),
      new Ingredient('Pepper', 1),
      new Ingredient('Salt', 1),
    ]),
    new Recipe('Special Italian Spaghetti', 'Learn how to make delicious Italian Spaghetti', 'https://assets.bonappetit.com/photos/59bbfb9f6375992e505c1bd3/1:1/w_1920,c_limit/classic-spaghetti-and-meatballs.jpg',
      [
        new Ingredient('Spagetti', 1),
        new Ingredient('Oil', 1),
        new Ingredient('Pepper', 1),
        new Ingredient('Salt', 1),
        new Ingredient('Tomato', 5),
        new Ingredient('Meat', 1),
        new Ingredient('Parsley', 1),
        new Ingredient('Paprica', 1),
        new Ingredient('Onion', 1)

      ]),
    new Recipe('Lebnonese Rice Shrimp', 'Learn how to make Lebnonese extinguished sea-food', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawn_fried_rice-2481925.jpg?quality=90&resize=440,400',
      [
        new Ingredient('Oil', 1),
        new Ingredient('Pepper', 1),
        new Ingredient('Salt', 1),
        new Ingredient('Tomato', 3),
        new Ingredient('Shrimp', 10),
        new Ingredient('Rice', 1),
        new Ingredient('Garic', 1),
        new Ingredient('Pea', 20)
      ]),
    new Recipe('Homemade Ratatouille', 'Beautiful delicious layered homemade Ratatouille recipe', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
      [
        new Ingredient('Eggplant', 3),
        new Ingredient('Pepper', 1),
        new Ingredient('Salt', 1),
        new Ingredient('Tomato', 3),
        new Ingredient('Zuccini', 2),
        new Ingredient('Bread', 1),
        new Ingredient('Paprica', 1)
      ])
  ];
  private SelectedRecipe$ = new BehaviorSubject<Recipe>(new Recipe('', '', '', []));


  get selectedRecipe$(): BehaviorSubject<Recipe> {
    return this.SelectedRecipe$;
  }

  set selectedRecipe$(value: Recipe) {
    this.SelectedRecipe$.next(value);
  }

  private Recipes$ = new BehaviorSubject<Recipe[]>(this.recipes);

  get recipes$(): BehaviorSubject<Recipe[]> {
    return this.Recipes$;
  }
  getRecipes(): Recipe[] {
    return this.recipes.slice();
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  updateRecipe(index: number, newrecipe: Recipe) {
    this.recipes[index] = newrecipe;
  }

  deleteRecipe(index:number){
    this.recipes.splice(index,1);
  }

}
