import { Ingredient } from './../../../shared/model/Ingredient.model';
import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ShoppingListService } from '../../services/shopping-list.service';
import { NgForm } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f', { static: false }) slForm !: NgForm;
  private _unsubscribe = new Subject<any>();
  editMode = false;
  editingIngredient !: Ingredient;
  editingIngredientIndex = -1;

  constructor(private shoppingListService: ShoppingListService) {
  }

  AddNewIngredient(formValue: { name: string, amount: number }) {
    this.shoppingListService.AddNewIngredient(new Ingredient(formValue.name, formValue.amount));
    this.resetForm();
  }

  resetForm() {
    this.editMode = false;
    this.slForm.reset();
  }

  UpdateEditingIngredint(ingredient: Ingredient) {
    this.shoppingListService.updateIngredient(this.editingIngredientIndex, ingredient);
    this.resetForm();
  }

  DeleteEditingItem() {
    this.shoppingListService.deleteIngredient(this.editingIngredientIndex);
    this.resetForm();
  }

  ClearAllItems() {
    this.shoppingListService.clearIngredients();
    this.resetForm();
  }

  OnSubmit(form: NgForm) {
    if (this.editMode) {
      this.UpdateEditingIngredint(form.value);
    }
    else {
      this.AddNewIngredient(form.value);
    }
  }

  ngOnInit(): void {
    this.shoppingListService.startedEditing$.pipe(takeUntil(this._unsubscribe))
      .subscribe(
        (index) => {
          this.editMode = true;
          this.editingIngredientIndex = index;
          this.editingIngredient = this.shoppingListService.getIngredient(index);
          this.slForm.setValue({ name: this.editingIngredient.name, amount: this.editingIngredient.amount });
        }
      );
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }
}
