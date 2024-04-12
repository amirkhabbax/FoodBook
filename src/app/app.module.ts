import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './shopping_list_feature/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './shopping_list_feature/shopping-list/shopping-edit/shopping-edit.component';
import { RecipesComponent } from './recipe_book_feature/recipes/recipes.component';
import { RecipeComponent } from './recipe_book_feature/recipes/recipe-list/recipe-list.component';
import { RecipeItemComponent } from './recipe_book_feature/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeDetailComponent } from './recipe_book_feature/recipes/recipe-detail/recipe-detail.component';
import { DropdownDirectiveDirective } from './shared/dropdown.directive.directive';
import { RecipeEditComponent } from './recipe_book_feature/recipes/recipe-edit/recipe-edit.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth/auth.component';
import { LoadingSpinnerComponent } from './shared/loading-spinner/loading-spinner/loading-spinner.component'
import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipesComponent,
    RecipeComponent,
    RecipeItemComponent,
    RecipeDetailComponent,
    DropdownDirectiveDirective,
    RecipeEditComponent,
    ErrorPageComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
