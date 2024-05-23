import { createReducer, on } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/model/Ingredient.model';
import { AddIngredient } from '../Actions/shopping-list.actions';

const initialState = { ingredients: [new Ingredient('Apples', 5)] };

export const ShoppingListReducer = createReducer(
  initialState,
  on(AddIngredient, (state, action) => ({
    ...state,
    ingredients: [...state.ingredients, action.ingredient],
  }))
);
