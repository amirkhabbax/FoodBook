import { createAction, props } from '@ngrx/store';
import { Ingredient } from 'src/app/shared/model/Ingredient.model';

export const AddIngredientIdentifier='[Shopping_List] AddIngredient';

export const AddIngredient = createAction(
  AddIngredientIdentifier,
  props<{ ingredient: Ingredient }>()
);
