import { Component, ElementRef, ViewChild } from '@angular/core';
import { Ingredient } from '../../../shared/model/Ingredient.model';
import { ShoppingListService } from '../../services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
  @ViewChild('nameInput') nameInput: ElementRef = {} as ElementRef;
  @ViewChild('amountInput') amountInput: ElementRef = {} as ElementRef;


  constructor(private shoppingListService: ShoppingListService) {
  }

  AddNewIngredient() {
    this.shoppingListService.AddNewIngredient(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
  }
}
