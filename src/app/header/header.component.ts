import { RecipeService } from 'src/app/recipe_book_feature/services/recipe.service';
import { Component } from '@angular/core';
import { IsActiveMatchOptions, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  recipeId: number = 0;

  constructor(private recipeService: RecipeService, private router: Router) {

  }

  RecipeLinkClicked() {
    this.recipeId = this.recipeService.getRecipes().indexOf(this.recipeService.selectedRecipe$.value);
    this.router.navigate(['recipes', this.recipeId]);
  }

  isLinkActive(url: string): boolean {
    return this.router.url.includes(url);
  }
}
