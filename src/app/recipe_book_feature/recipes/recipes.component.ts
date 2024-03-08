import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from 'src/app/auth/auth/auth.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  isLoggedIn: boolean = false;
  private _unsubscribe = new Subject<any>();


  constructor(private authService: AuthService) {

  }

  ngOnInit(): void {
    this.authService.isAnyUserLoggedIN.pipe(takeUntil(this._unsubscribe)).subscribe(next => {
      this.isLoggedIn = next;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }

}
