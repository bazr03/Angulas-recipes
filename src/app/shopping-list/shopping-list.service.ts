import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { Ingredient } from '../shared/ingredient.model';
import * as ShopingListActions from './store/shopping-list.actions';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {
  ingredientsChange = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Tomatoes', 10),
    new Ingredient('Apples', 5),
  ];

  constructor(private store: Store<{ shoppingList: { ingredients: Ingredient[] } }>) {}

  getIngredients() {
    return this.ingredients.slice(); // regresa una copia, no una referencia
  }
  getIngredient(index: number) {
    return this.ingredients[index];
  }
  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChange.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // this.ingredients = [...this.ingredients, ...ingredients];
    // this.ingredients.push(...ingredients);
    // this.ingredientsChange.next(this.ingredients.slice());
    this.store.dispatch(new ShopingListActions.AddIngredients(ingredients));
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChange.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChange.next(this.ingredients.slice());
  }
}
