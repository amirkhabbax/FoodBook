import { RecipeService } from 'src/app/recipe_book_feature/services/recipe.service';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  // @Output() featureClicked = new EventEmitter<string>();
  recipeName: string = '';

  constructor(private recipeService: RecipeService) {
    this.recipeName = this.recipeService.selectedRecipe$.value.name;
  }
  

  // OnSelect() {
  //   //   this.featureClicked.emit(feature);
  // }

}
