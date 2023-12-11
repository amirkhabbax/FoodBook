import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Ingredient } from '../../model/Ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent {
@ViewChild('nameInput') nameInput : ElementRef = {} as ElementRef;
@ViewChild('amountInput') amountInput : ElementRef = {} as ElementRef;
@Output() newIngredient= new EventEmitter<Ingredient>();

  AddIngredient() {
    this.newIngredient.emit(new Ingredient(this.nameInput.nativeElement.value, this.amountInput.nativeElement.value));
  }
}
