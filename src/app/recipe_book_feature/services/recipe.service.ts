import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/model/recipe.model';
import { BehaviorSubject } from 'rxjs';
import { Ingredient } from 'src/app/shared/model/Ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private SelectedRecipe$ = new BehaviorSubject<Recipe>(new Recipe('', '', '',[]));

  get selectedRecipe$(): BehaviorSubject<Recipe> {
    return this.SelectedRecipe$;
  }

  set selectedRecipe$ (value:Recipe){
    this.SelectedRecipe$.next(value);
  } 

  private recipes: Recipe[] = [
    new Recipe('Middle Eastern Falafel', 'Learn how to make crispy, delicious Middle Eastern falafel', 'https://toriavey.com/images/2011/01/TOA109_18-1-500x500.jpeg',[
      new Ingredient('Pea'   ,200),
      new Ingredient('Oil'   ,1  ),
      new Ingredient('Pepper',1  ),
      new Ingredient('Salt'  ,1  ),
    ]),
    new Recipe('Special Italian Spagetti', 'Learn how to make delicious Italian spagetti', 'https://www.foodandwine.com/thmb/YlgBj_G9a_psYSzA3gfU6gx9A3w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bucatini-with-mushroom-ragu-dandelion-greens-and-tarragon-FT-RECIPE0421-3a5f0d29f7264f5e9952d4a3a51f5f58.jpg',
    [
      new Ingredient('Spagetti',1),
      new Ingredient('Oil'     ,1),
      new Ingredient('Pepper'  ,1),
      new Ingredient('Salt'    ,1),
      new Ingredient('Tomato'  ,5),
      new Ingredient('Meat'    ,1),
      new Ingredient('Parsley' ,1),
      new Ingredient('Paprica' ,1),
      new Ingredient('Onion'   ,1)

    ]),
    new Recipe('Lebnonese Rice Shrimp', 'Learn how to make Lebnonese extinguished sea-food', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawn_fried_rice-2481925.jpg?quality=90&resize=440,400',
    [
      new Ingredient('Oil'   ,1 ),
      new Ingredient('Pepper',1 ),
      new Ingredient('Salt'  ,1 ),
      new Ingredient('Tomato',3 ),
      new Ingredient('Shrimp',10),
      new Ingredient('Rice'  ,1 ),
      new Ingredient('Garic' ,1 ),
      new Ingredient('Pea'   ,20)
    ]),
    new Recipe('Homemade Ratatouille', 'Beautiful delicious layered homemade Ratatouille recipe', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg',
    [
      new Ingredient('Eggplant',3),
      new Ingredient('Pepper'  ,1),
      new Ingredient('Salt'    ,1),
      new Ingredient('Tomato'  ,3),
      new Ingredient('Zuccini' ,2),
      new Ingredient('Bread'   ,1),
      new Ingredient('Paprica' ,1)
    ])
  ];

  getRecipes(): Recipe[]{
    return this.recipes.slice();
  }

}
