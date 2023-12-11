import { Component, EventEmitter, Output , OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipe_list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeComponent implements OnInit{
  @Output() recipeSelected = new EventEmitter<Recipe>();
  selectedRecipe!:Recipe;
  recipes: Recipe[] = [
    new Recipe('Middle Eastern Falafel', 'Learn how to make crispy, delicious Middle Eastern falafel', 'https://toriavey.com/images/2011/01/TOA109_18-1-500x500.jpeg'),
    new Recipe('Special Italian Spagetti', 'Learn how to make delicious Italian spagetti', 'https://www.foodandwine.com/thmb/YlgBj_G9a_psYSzA3gfU6gx9A3w=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/bucatini-with-mushroom-ragu-dandelion-greens-and-tarragon-FT-RECIPE0421-3a5f0d29f7264f5e9952d4a3a51f5f58.jpg'),
    new Recipe('Lebnonese Rice Shrimp', 'Learn how to make Lebnonese extinguished sea-food', 'https://images.immediate.co.uk/production/volatile/sites/30/2020/08/prawn_fried_rice-2481925.jpg?quality=90&resize=440,400'),
    new Recipe('Homemade Ratatouille','Beautiful delicious layered homemade Ratatouille recipe','https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe-500x500.jpg')
  ];

  ngOnInit(){
    this.SelectItem(this.recipes[this.randomIntFromInterval(0,this.recipes.length-1)]);

  }

  SelectItem(recipe: Recipe) {
    this.selectedRecipe = recipe;
    this.recipeSelected.emit(recipe);
  }

  randomIntFromInterval(min:number, max:number):number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
