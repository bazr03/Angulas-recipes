import { Ingredient } from "../shared/ingredient.model";
import { Action } from "@ngrx/store";

const initialState = {
  ingredients: [new Ingredient("Tomatoes", 10), new Ingredient("Apples", 5)],
};

export function ShoppingListReducer(state = initialState, action: Action) {
  switch (action.type) {
    case "ADD_INGREDIENT":
      return {
        ...state,
        ingredients: [...state.ingredients, action],
      };
  }
}
