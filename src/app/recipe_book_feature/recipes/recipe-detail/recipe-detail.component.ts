import { ShoppingListService } from './../../../shopping_list_feature/services/shopping-list.service';
import { RecipeService } from './../../services/recipe.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../model/recipe.model';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {

  loadedRecipe !: Recipe;
  private _unsubscribe = new Subject<any>();
  constructor(private recipeService: RecipeService, private shoppingListService: ShoppingListService, private router: Router) { }

  ngOnInit(): void {
    this.recipeService.selectedRecipe$.pipe(takeUntil(this._unsubscribe)).subscribe((recipe) => {
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

  DeleteRecipe() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "#cf1e06",
      cancelButtonColor: "#1c9c4b",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.recipeService.deleteRecipe(this.recipeService.recipes$.value.indexOf(this.loadedRecipe));
        this.recipeService.selectedRecipe$ = this.recipeService.recipes$.value[this.randomIntFromInterval(0, this.recipeService.recipes$.value.length - 1)];
        let recipeId = this.recipeService.recipes$.value.indexOf(this.recipeService.selectedRecipe$.value);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
        this.router.navigate(['recipes', recipeId]);
      }
    });

  }

  randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
