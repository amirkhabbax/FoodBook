import { Router } from '@angular/router';
import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../model/recipe.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';


@Component({
  selector: 'app-recipe_list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeComponent implements OnInit, OnDestroy {

  private _unsubscribe = new Subject<any>();
  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.recipeService.recipes$.pipe(takeUntil(this._unsubscribe))
    .subscribe(
      value => { 
        this.recipes = value 
      }
    );
    this.recipeService.selectedRecipe$ = this.recipes[this.randomIntFromInterval(0, this.recipes.length - 1)];
    this.router.navigate(['/recipes', this.recipeService.recipes$.value.indexOf(this.recipeService.selectedRecipe$.value)]);
  }

  randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
