import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponsedata, AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe_book_feature/services/recipe.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  recipeId: number = 0;

  constructor(private authService: AuthService, private router:Router,private recipeService: RecipeService) {

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(authForm: NgForm) {

    if (!authForm.valid) {
      return;
    }

    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObservable = new Observable<AuthResponsedata>();
    if (this.isLoginMode) {
      authObservable = this.authService.login(email, password)
    }
    else {
      authObservable = this.authService.signUp(email, password);
    }
    
    this.isLoading = true;
    authObservable.subscribe(
      {
        next: (response) => {
          this.isLoading = false;
           this.recipeId = this.recipeService.recipes$.value.indexOf(this.recipeService.selectedRecipe$.value);
           this.router.navigate(['recipes', this.recipeId]);
         // this.router.navigate(['./recipes']);

        },
        error: (errorMessage) => {
          this.isLoading = false;
          console.log(errorMessage);
          this.error = errorMessage;
          setTimeout(() => {
            this.error = '';
          }, 5000);
        }
      }
    );

    authForm.reset();
  }
}
