import { Component } from '@angular/core';
import {Ingredient}from '../../shared/model/Ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent {
ingredients: Ingredient[]= [
  new Ingredient('Potatoes'       , 5  ),
  new Ingredient('Tomatoes'       , 50 ),
  new Ingredient('Shrimp'         , 10 ),
  new Ingredient('Pea'            , 500),
  new Ingredient('Spagetti'       , 5  ),
  new Ingredient('Rice'           , 10 ),
  new Ingredient('Tea'            , 2  ),
  new Ingredient('Apples'         , 5  ),
  new Ingredient('Coffee'         , 20 ),
  new Ingredient('Parsley'        , 52 ),
  new Ingredient('Rosemary'       , 12 ),
  new Ingredient('Eggplant'       , 25 ),
  new Ingredient('Zuccini'        , 15 ),
  new Ingredient('Pumpkin'        , 4  ),
  new Ingredient('Salt'           , 55 ),
  new Ingredient('Pepper'         , 58 ),
  new Ingredient('Sugar'          , 75 ),
  new Ingredient('Saffron'        , 2  ),
  new Ingredient('Caviar'         , 2  ),
  new Ingredient('Salmon Fish'    , 75 ),
  new Ingredient('Tuna Fish'      , 45 ),
  new Ingredient('Tuna Can'       , 35 ),
  new Ingredient('Lamb Meat'      , 85 ),
  new Ingredient('Chicken Breast' , 25 ),
  new Ingredient('Bakon'          , 72 ),
  new Ingredient('Oil'            , 64 ),
  new Ingredient('Olive Oil'      , 32 ),
  new Ingredient('Soye Oil'       , 21 ),
  new Ingredient('Cow Meat'       , 36 ),
  new Ingredient('Sheep Meat'     , 74 ),
  new Ingredient('Chicken Tigh'   , 95 ),
  new Ingredient('Chicken Wing'   , 34 ),
  new Ingredient('Bananas'        , 6  ),
  new Ingredient('Oranges'        , 98 ),
  new Ingredient('Lemon Juice'    , 21 ),
  new Ingredient('Lemon'          , 35 ),
  new Ingredient('Garlick'        , 28 ),
  new Ingredient('Onion'          , 74 ),
  new Ingredient('Paprica'        , 14 ),
];

AddNewIngredient(newIngredient:Ingredient){
  this.ingredients.push(newIngredient);
}
}
