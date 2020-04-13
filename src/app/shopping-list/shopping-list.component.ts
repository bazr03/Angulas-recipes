import { Component, OnInit, OnDestroy } from "@angular/core";
import { Observable } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "../shared/ingredient.model";
import * as fromAppStore from "../store/app.reducer";
import * as ShoppingListActions from "./store/shopping-list.actions";

@Component({
  selector: "app-shopping-list",
  templateUrl: "./shopping-list.component.html",
  styleUrls: ["./shopping-list.component.css"],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ ingredients: Ingredient[] }>;
  constructor(private store: Store<fromAppStore.AppState>) {}

  ngOnInit(): void {
    this.ingredients = this.store.select("shoppingList"); // esto regresa un Observable
  }

  ngOnDestroy(): void {
    // this.igSub.unsubscribe();
  }
  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }
}
