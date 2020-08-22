import { Subject } from "rxjs";
// import { Store } from '@ngrx/store';

import { Recipe } from "./recipes.model";
// import { Ingredient } from "../shared/ingredient.model";


export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     "Easy butter chicken",
  //     "Fancy a healthy version of your favourite Friday night chicken curry? ",
  //     "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe/recipe-image/2017/01/butter-chicken.jpg?itok=eE_5ufkS",
  //     [
  //       new Ingredient("lemon", 1),
  //       new Ingredient("paproka", 2),
  //       new Ingredient("natural yogurt", 1),
  //       new Ingredient("hot chilli powder", 2),
  //       new Ingredient("chiken stock", 1),
  //       new Ingredient("Tomotoes", 3),
  //     ]
  //   ),
  //   new Recipe(
  //     "Easy pancakes",
  //     "Learn a skill for life with our foolproof crêpe recipe that ensures perfect pancakes every time ",
  //     "https://www.bbcgoodfood.com/sites/default/files/styles/recipe/public/recipe_images/recipe-image-legacy-id--1273477_8.jpg?itok=6VhpTntM",
  //     [
  //       new Ingredient("plain flour", 1),
  //       new Ingredient("large eggs", 2),
  //       new Ingredient("milk", 1),
  //       new Ingredient("vegetable oil", 1),
  //     ]
  //   ),
  // ];

  private recipes: Recipe[];



  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice());
  }
  getRecipes() {
    return this.recipes; // regresa una copia no solo una refencia
  }

  getRecipe(index: number) {
    // return this.recipes.find(recipe => recipe.id === id);
    return this.recipes[index];
  }

 

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }
  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
