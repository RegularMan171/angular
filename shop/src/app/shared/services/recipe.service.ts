import { Injectable } from '@angular/core';
import { Recipe } from 'src/app/recipes/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  private recipes: Recipe[] = [
    new Recipe("Water","Everybody needs water","https://examsbook.co.in/img/post/large/0lBTMirror-and-Water-Image-Questions.jpg"),
    new Recipe("H2O","Everybody needs water","https://examsbook.co.in/img/post/large/0lBTMirror-and-Water-Image-Questions.jpg")    
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  constructor() { }
}
