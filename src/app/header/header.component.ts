import { DataStorageService } from './../shared/services/data-storage.service';
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

  constructor(private recipeService: RecipeService, private router: Router , private dataStorageService:DataStorageService) {

  }

  RecipeLinkClicked() {
    this.recipeId = this.recipeService.recipes$.value.indexOf(this.recipeService.selectedRecipe$.value);
    this.router.navigate(['recipes', this.recipeId]);
  }

  isLinkActive(url: string): boolean {
    return this.router.url.includes(url);
  }

  OnSaveData(){
    this.dataStorageService.storeRecipes();
  }

  OnFetchData(){
    this.dataStorageService.fetchRecipes().subscribe();

  }
}
