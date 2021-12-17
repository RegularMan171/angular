import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';
import { Ingredient } from '../ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  recipeSelected = new EventEmitter<Recipe>();

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

  constructor() { }
}
