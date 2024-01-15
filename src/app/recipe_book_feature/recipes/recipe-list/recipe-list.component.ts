import { Router } from '@angular/router';
import { RecipeService } from './../../services/recipe.service';
import { Recipe } from './../model/recipe.model';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-recipe_list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeComponent implements OnInit {

  recipes: Recipe[] = [];

  constructor(private recipeService: RecipeService, private router:Router) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.selectedRecipe$ = this.recipes[this.randomIntFromInterval(0, this.recipes.length - 1)];
    this.router.navigate(['/recipes', this.recipeService.getRecipes().indexOf(this.recipeService.selectedRecipe$.value)]);
  }

  randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
