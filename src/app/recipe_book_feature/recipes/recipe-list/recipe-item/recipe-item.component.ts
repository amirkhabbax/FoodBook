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

  constructor(private recipeService:  RecipeService, private router: Router) {
  }


  ngOnInit(): void {
    this.recipeService.selectedRecipe$.subscribe((recipe) => {
      this.selectedRecipe = recipe;
      this.router.navigate(['/recipes', this.selectedRecipe.name]);
    });
  }

  itemSelected() {
    this.recipeService.selectedRecipe$ = this.recipe;
    this.router.navigate(['/recipes', this.recipe.name]);
  }
}
