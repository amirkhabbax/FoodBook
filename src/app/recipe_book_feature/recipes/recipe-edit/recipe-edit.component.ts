import { RecipeService } from './../../services/recipe.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id !: number;
  isEditing : boolean = false;
  constructor(private activatedRoute : ActivatedRoute , private recipeService:RecipeService){}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params: Params)=>{
      this.id = +params['id'];
      this.isEditing = params['id'] != null;
    });
  }


}
