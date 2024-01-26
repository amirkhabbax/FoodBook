import { RecipeService } from 'src/app/recipe_book_feature/services/recipe.service';
import { Recipe } from './../../model/recipe.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit , OnDestroy {
  @Input() recipe!: Recipe;
  selectedRecipe !: Recipe;
  index !: number;
  private _unsubscribe = new Subject<any>();
  constructor(private recipeService:  RecipeService) {
  }


  ngOnInit(): void {
    this.index = this.recipeService.recipes$.value.indexOf(this.recipe);
    this.recipeService.selectedRecipe$.pipe(takeUntil( this._unsubscribe)).subscribe((recipe) => {
      this.selectedRecipe = recipe;
    });
  }

  itemSelected() {
    this.recipeService.selectedRecipe$ = this.recipe;
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
  
}
