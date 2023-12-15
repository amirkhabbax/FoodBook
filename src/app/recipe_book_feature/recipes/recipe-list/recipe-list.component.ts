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

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
    this.recipes = this.recipeService.getRecipes();
    this.recipeService.selectedRecipe$ = this.recipes[this.randomIntFromInterval(0, this.recipes.length - 1)];

  }

  randomIntFromInterval(min: number, max: number): number { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
}
