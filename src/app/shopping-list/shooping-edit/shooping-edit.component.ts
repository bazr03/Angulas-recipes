import { Component, OnInit, ViewChild, OnDestroy } from "@angular/core";

import { Ingredient } from "../../shared/ingredient.model";
import { ShoppingListService } from "../shopping-list.service";
import { NgForm } from "@angular/forms";
import { Subscription } from "rxjs";
@Component({
  selector: "app-shooping-edit",
  templateUrl: "./shooping-edit.component.html",
  styleUrls: ["./shooping-edit.component.css"],
})
export class ShoopingEditComponent implements OnInit, OnDestroy {
  @ViewChild("f") signupForm: NgForm;
  subscription: Subscription;
  editMode = false;
  editedIndexItem: number;
  editedItem: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit(): void {
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedIndexItem = index;
        this.editedItem = this.shoppingListService.getIngredient(index);
        this.signupForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount,
        });
      }
    );
  }

  onSubmit() {
    // console.log(this.signupForm);
    const ingredientName = this.signupForm.value.name;
    const ingredientAmount = +this.signupForm.value.amount;
    const newIngredient = new Ingredient(ingredientName, ingredientAmount);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(
        this.editedIndexItem,
        newIngredient
      );
    } else {
      this.shoppingListService.addIngredient(newIngredient);
    }
    this.editMode = false;
    this.signupForm.reset();
  }

  onClear() {
    this.signupForm.reset();
    this.editMode = false;
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedIndexItem);
    this.onClear();
  }
}
