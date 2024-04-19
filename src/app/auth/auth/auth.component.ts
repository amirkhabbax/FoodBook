import { Component, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponsedata, AuthService } from './auth.service';
import { Observable, takeUntil, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { RecipeService } from 'src/app/recipe_book_feature/services/recipe.service';
import { AlertComponemnt } from 'src/app/shared/alert/alert.cmponent';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = '';
  recipeId: number = 0;
  @ViewChild('alert', { read: ViewContainerRef }) alert !: ViewContainerRef;

  unsubscribe = new Subject<void>();
  constructor(private authService: AuthService, private router: Router, private recipeService: RecipeService) {

  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
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
          this.showErrorAlert(this.error);
        }
      }
    );

    authForm.reset();
  }

  showErrorAlert(message: string) {
    this.alert.clear();
    const alertComponent = this.alert.createComponent(AlertComponemnt);

    alertComponent.instance.message = message;
    alertComponent.instance.closeEvent.pipe(takeUntil(this.unsubscribe)).subscribe(() => {
      this.alert.clear();
    });

  }
}
