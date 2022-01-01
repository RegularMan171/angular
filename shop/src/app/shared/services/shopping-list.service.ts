import { Injectable } from '@angular/core';
import { Ingredient } from '../ingredient.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient("Hydrogen", 2),
    new Ingredient("Oxygen", 1)
  ];
  ingredientsChanged = new Subject<Ingredient[]>();
  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(i: Ingredient) {
    this.ingredients.push(i);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(i: Ingredient[]) {
    this.ingredients.push(...i);
    this.ingredientsChanged.next(this.ingredients.slice());
  }
}
