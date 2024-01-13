import { RecipeService } from 'src/app/recipe_book_feature/services/recipe.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  recipeId: number = 0;

  constructor(private recipeService: RecipeService , private router: Router) {
    this.recipeId = this.recipeService.getRecipes().indexOf(this.recipeService.selectedRecipe$.value);
  }

}
