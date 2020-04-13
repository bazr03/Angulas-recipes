import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipes.model";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";
import { Store } from "@ngrx/store";
import * as ShoppingListActions from "../../shopping-list/store/shopping-list.actions";
import * as fromAppStore from "../../store/app.reducer";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  index: number;
  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<fromAppStore.AppState>
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params["index"];
      this.recipe = this.recipeService.getRecipe(this.index);
    });
  }

  toShoppingList() {
    this.store.dispatch(
      new ShoppingListActions.AddIngredients(this.recipe.ingredients)
    );
    // this.shoppingListService.addIngredients(this.recipe.ingredients);
  }
  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route });
    // this.router.navigate(['../', this.index, 'edit'], { relativeTo: this.route });
    // forma de crear un path más complejo
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.index);
    this.router.navigate(["/recipes"]);
  }
}
