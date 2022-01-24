import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe("Water",
    "Everybody needs water",
    "https://examsbook.co.in/img/post/large/0lBTMirror-and-Water-Image-Questions.jpg",
    [
      new Ingredient('Hydrogen', 2),
      new Ingredient('Oxygen', 1)
    ]),
    new Recipe("H2O",
    "Everybody needs water",
    "https://examsbook.co.in/img/post/large/0lBTMirror-and-Water-Image-Questions.jpg",
    [
      new Ingredient('H',2),
      new Ingredient('O', 2)
    ])    
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  constructor(private sls: ShoppingListService) { }

  addIngredientsToList(ingredients: Ingredient[]) {
    this.sls.addIngredients(ingredients);
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
