import { ShoppingListService } from './../../../shopping_list_feature/services/shopping-list.service';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Ingredient } from 'src/app/shared/model/Ingredient.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  loadedRecipe !: Recipe ;
  
  constructor(private recipeService:RecipeService , private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.recipeService.selectedRecipe$.subscribe((recipe) => {
      this.loadedRecipe = recipe;
    });
  }

  ToShoppingList() {
    this.loadedRecipe.ingredients.forEach((Ingredient) => { this.shoppingListService.AddNewIngredient(Ingredient) });
  }
}
