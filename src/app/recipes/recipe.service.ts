import { Subject } from "rxjs";
// import { Store } from '@ngrx/store';

import { Recipe } from "./recipes.model";


export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();


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
