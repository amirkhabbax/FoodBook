import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../../shared/model/Ingredient.model'
import { ShoppingListService } from '../services/shopping-list.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients !: Ingredient[];
  private _unsubscribe = new Subject<any>();
  constructor(private shoppingListService: ShoppingListService) {
  }

  ngOnInit(): void {
    this.shoppingListService.ingredient$.pipe(takeUntil(this._unsubscribe)).subscribe((result) => {
      this.ingredients = result;
    });
  }

  ngOnDestroy(): void {
    this._unsubscribe.next(null);
    this._unsubscribe.complete();
  }

}
