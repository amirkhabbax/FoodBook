import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { Form, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../model/recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  EditingRecipe !: Recipe;
  recipeEditForm !: FormGroup;
  id !: number;
  isEditing: boolean = false;
  constructor(private activatedRoute: ActivatedRoute, private recipeService: RecipeService, private formbuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.isEditing = params['id'] != null;
      if (this.isEditing) {
        this.EditingRecipe = this.recipeService.getRecipe(this.id);
      } else {
        this.EditingRecipe = new Recipe('', '', '', []);
      }
      this.initForm();
    });

    this.recipeEditForm.valueChanges.subscribe(change => {
      this.OnFormChanges(change)
    })
  }

  OnFormChanges(change: Recipe) {
    this.EditingRecipe = change; //this.EditingRecipe.ingredients = change.ingredients;
  }

  onCancel() {
    if (this.isEditing) {
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } else {
      let recipeId = this.recipeService.recipes$.value.indexOf(this.recipeService.selectedRecipe$.value);
      this.router.navigate(['recipes', recipeId]);
    }
  }

  private initForm() {

    let ingredientsArray = this.formbuilder.array<FormGroup>([]);

    this.EditingRecipe.ingredients.forEach((ingredient) => {
      ingredientsArray.push(this.formbuilder.group({
        name: [ingredient.name, Validators.required],
        amount: [ingredient.amount,
        [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]
        ]
      }));
    });

    this.recipeEditForm = this.formbuilder.group({
      name: [this.EditingRecipe.name, Validators.required],
      imagePath: [this.EditingRecipe.imagePath, Validators.required],
      description: [this.EditingRecipe.description, Validators.required],
      ingredients: ingredientsArray
    });
  }

  AddEmptyIngredientObjectToRecipe() {
    (this.recipeEditForm.get('ingredients') as FormArray).push(this.formbuilder.group({
      name: this.formbuilder.control(null, Validators.required),
      amount: this.formbuilder.control(null,
        [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]
      )
    }));

    this.recipeEditForm.updateValueAndValidity();
  }

  DeleteIngredientFromRecipe(index: number) {
    this.ingredientsArray.removeAt(index);
    this.recipeEditForm.updateValueAndValidity();
  }

  OnSubmit() {

    if (this.isEditing) 
    {
      this.recipeService.updateRecipe(this.id, this.recipeEditForm.value);
      this.recipeService.selectedRecipe$ = this.recipeEditForm.value;
      this.router.navigate(['../'], { relativeTo: this.activatedRoute });
    } 
    else 
    {
      const newRecipe = this.recipeEditForm.value;
      this.recipeService.addRecipe(newRecipe);
      this.recipeService.selectedRecipe$ = newRecipe;
      let recipeId = this.recipeService.recipes$.value.indexOf(newRecipe);
      this.router.navigate(['recipes', recipeId]);
    }
  }

  get ingredientsArray() { // a getter!
    return (this.recipeEditForm.get('ingredients') as FormArray);
  }

}
