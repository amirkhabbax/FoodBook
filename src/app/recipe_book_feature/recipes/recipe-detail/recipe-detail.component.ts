import { ShoppingListService } from './../../../shopping_list_feature/services/shopping-list.service';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit , OnDestroy {

  loadedRecipe !: Recipe ;
  private _unsubscribe  = new Subject<any>();
  constructor(private recipeService:RecipeService , private shoppingListService: ShoppingListService , private router: Router) {}

  ngOnInit(): void {
    this.recipeService.selectedRecipe$.pipe(takeUntil( this._unsubscribe)).subscribe((recipe) => {
      this.loadedRecipe = recipe;
    });
  }

  ToShoppingList() {
    this.loadedRecipe.ingredients.forEach((Ingredient) => { this.shoppingListService.AddNewIngredient(Ingredient) });
    this.router.navigate(['/shoppingList']);
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
