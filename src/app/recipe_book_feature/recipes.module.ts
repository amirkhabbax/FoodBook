import { NgModule } from "@angular/core";
import { RecipeEditComponent } from "./recipes/recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipes/recipe-detail/recipe-detail.component";
import { RecipeItemComponent } from "./recipes/recipe-list/recipe-item/recipe-item.component";
import { RecipeComponent } from "./recipes/recipe-list/recipe-list.component";
import { RecipesComponent } from "./recipes/recipes.component";
import { ReactiveFormsModule } from "@angular/forms";
import { RecipesRoutingModule } from "./recipesRoutingModule/recipes-routing/recipes-routing.module";
import { SharedModule } from "../shared/shared.module";

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeEditComponent
    ],
    imports: [
        SharedModule,
        RecipesRoutingModule,
        ReactiveFormsModule
    ],
    exports: [SharedModule],
    providers: []
})
export class RecipesModule {

}