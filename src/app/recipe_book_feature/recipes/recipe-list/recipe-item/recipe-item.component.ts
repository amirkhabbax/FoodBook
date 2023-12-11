import { Recipe } from './../../model/recipe.model';
import { Component , EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent {
  @Input() recipe!:Recipe;
  @Input() selectedRecipe!:Recipe;
  @Output() itemClicked = new EventEmitter<void>();


  itemSelected(){
    this.itemClicked.emit();
  }
}
