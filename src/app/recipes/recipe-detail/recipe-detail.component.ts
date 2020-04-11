import { Component, OnInit } from "@angular/core";
import { Recipe } from "../recipes.model";
import { ShoppingListService } from "src/app/shopping-list/shopping-list.service";
import { RecipeService } from "../recipe.service";
import { ActivatedRoute, Params, Router } from "@angular/router";

@Component({
  selector: "app-recipe-detail",
  templateUrl: "./recipe-detail.component.html",
  styleUrls: ["./recipe-detail.component.css"],
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  index: number;
  constructor(
    private shoppingListService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.index = +params["index"];
      this.recipe = this.recipeService.getRecipe(this.index);
    });
  }

  toShoppingList() {
    this.shoppingListService.addIngredients(this.recipe.ingredients);
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
