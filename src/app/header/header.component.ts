import { AuthService } from './../auth/auth/auth.service';
import { DataStorageService } from './../shared/services/data-storage.service';
import { RecipeService } from 'src/app/recipe_book_feature/services/recipe.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  recipeId: number = 0;
  isLoggedIn : boolean = false;

  constructor(private recipeService: RecipeService, private router: Router, private dataStorageService: DataStorageService, private authService: AuthService) {

    this.authService.isAnyUserLoggedIN.subscribe(next=> {
      this.isLoggedIn = next;
    });

  }

  RecipeLinkClicked() {
    this.recipeId = this.recipeService.recipes$.value.indexOf(this.recipeService.selectedRecipe$.value);
    this.router.navigate(['recipes', this.recipeId]);
  }

  isLinkActive(url: string): boolean {
    return this.router.url.includes(url);
  }

  OnSaveData() {
    this.dataStorageService.storeRecipes();
  }

  OnFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();

  }

  Logout(){
    Swal.fire({
      title: "Are you sure?",
      text: "If you insist, then see you soon!",
      icon: "info",
      showCancelButton: true,
      focusCancel: true,
      confirmButtonColor: "#cf1e06",
      cancelButtonColor: "#1c9c4b",
      confirmButtonText: "Yes, log me out!"
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.Logout(); 
      }
    });
  }
}
