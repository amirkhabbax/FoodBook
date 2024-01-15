import { RecipeService } from 'src/app/recipe_book_feature/services/recipe.service';
import { Recipe } from './../../model/recipe.model';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit  {
  @Input() recipe!: Recipe;
  selectedRecipe !: Recipe;
  index !: number;

  constructor(private recipeService:  RecipeService, private router: Router) {
  }


  ngOnInit(): void {
    this.index = this.recipeService.getRecipes().indexOf(this.recipe);
    this.recipeService.selectedRecipe$.subscribe((recipe) => {
      this.selectedRecipe = recipe;
     // this.router.navigate(['/recipes', this.recipeService.getRecipes().indexOf(this.recipe)]);
    });
  }

  itemSelected() {
    this.recipeService.selectedRecipe$ = this.recipe;
  }
}
