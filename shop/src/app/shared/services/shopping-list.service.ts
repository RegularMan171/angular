import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {

  private ingredients: Ingredient[] = [
    new Ingredient("Hydrogen", 2),
    new Ingredient("Oxygen", 1)
  ];
  ingredientsChanged = new EventEmitter<Ingredient[]>();
  constructor() { }

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(i: Ingredient) {
    this.ingredients.push(i);
    this.ingredientsChanged.emit(this.ingredients.slice());
  }
}
