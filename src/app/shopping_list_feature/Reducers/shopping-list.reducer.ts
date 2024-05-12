import { createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/model/Ingredient.model';

const initialState = { ingredients: [new Ingredient('Apples', 5)] };

export const ShoppingListReducer = createReducer(
  initialState
  // on()
);
