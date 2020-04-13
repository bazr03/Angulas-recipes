import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
import { Store } from "@ngrx/store";

import { Ingredient } from "../../shared/ingredient.model";
import * as shoppingListActions from "../store/shopping-list.actions";
import * as fromAppStore from "../../store/app.reducer";

@Component({
  selector: "app-shooping-edit",
  templateUrl: "./shooping-edit.component.html",
  styleUrls: ["./shooping-edit.component.css"],
})
export class ShoopingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") signupForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedItem: Ingredient;

  constructor(private store: Store<fromAppStore.AppState>) {}

  ngOnInit(): void {
    this.subscription = this.store
      .select("shoppingList")
      .subscribe((stateData) => {
        if (stateData.editedIngredientIndex > -1) {
          this.editMode = true;
          this.editedItem = stateData.editedIngredient;
          this.signupForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount,
          });
        } else {
          this.editMode = false;
        }
      });
  }

  onSubmit() {
    const ingredientName = this.signupForm.value.name;
    const ingredientAmount = +this.signupForm.value.amount;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    if (this.editMode) {
      this.store.dispatch(
        new shoppingListActions.UpdateIngredient(newIngredient)
      );
    } else {
      this.store.dispatch(new shoppingListActions.AddIngredient(newIngredient));
    }
    this.editMode = false;
    this.signupForm.reset();
  }

  onClear() {
    this.signupForm.reset();
    this.editMode = false;
    this.store.dispatch(new shoppingListActions.StopEdit());
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
    this.store.dispatch(new shoppingListActions.StopEdit());
  }

  onDelete() {
    this.store.dispatch(new shoppingListActions.DeleteIngredient());
    this.onClear();
  }
}
