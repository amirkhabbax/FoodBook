import { ShoppingListService } from './../../../shopping_list_feature/services/shopping-list.service';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  loadedRecipe !: Recipe ;
  
  constructor(private recipeService:RecipeService , private shoppingListService: ShoppingListService , private router: Router) {}

  ngOnInit(): void {
    this.recipeService.selectedRecipe$.subscribe((recipe) => {
      this.loadedRecipe = recipe;
    });
  }

  ToShoppingList() {
    this.loadedRecipe.ingredients.forEach((Ingredient) => { this.shoppingListService.AddNewIngredient(Ingredient) });
    this.router.navigate(['/shoppingList']);
  }
}
