import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing/app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptorService } from './auth/auth/auth-interceptor.service';
import { RecipesModule } from './recipe_book_feature/recipes.module';
import { StoreModule } from '@ngrx/store';
import { ShoppingListReducer } from './shopping_list_feature/Store/Reducers/shopping-list.reducer';

@NgModule({
  declarations: [AppComponent, HeaderComponent, ErrorPageComponent],

  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    RecipesModule,
    StoreModule.forRoot({ ShoppingList: ShoppingListReducer }),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
