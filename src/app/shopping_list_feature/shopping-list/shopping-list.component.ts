import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/model/Ingredient.model'
import { ShoppingListService } from '../services/shopping-list.service';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  // ingredients!: Ingredient[];
  ingredients$!: Observable<{ ingredients: Ingredient[] }>;

  // private _unsubscribe = new Subject<any>();
  constructor(
    private shoppingListService: ShoppingListService,
    private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>
  ) {}

  ngOnInit(): void {
    this.ingredients$ = this.store.select('shoppingList');

    // this.shoppingListService.ingredient$
    //   .pipe(takeUntil(this._unsubscribe))
    //   .subscribe((result) => {
    //     this.ingredients = result;
    //   });
  }

  ngOnDestroy(): void {
    // this._unsubscribe.next(null);
    // this._unsubscribe.complete();
  }

  OnEditItem(index: number) {
    this.shoppingListService.startedEditing$.next(index);
  }
}
