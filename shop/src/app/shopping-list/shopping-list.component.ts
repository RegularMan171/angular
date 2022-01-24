import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients: Ingredient[];
  subs: Subscription;
  constructor(private sls: ShoppingListService) { }

  ngOnInit(): void {
    this.ingredients = this.sls.getIngredients();
    //listening to ingredients from the service for the changes in the ingredients array
    this.subs = this.sls.ingredientsChanged.subscribe(
      (updatedIngredients) => {
        this.ingredients = updatedIngredients;
      }
    )
  }
  
  onEditItem(id: number) {
    this.sls.startedEditing.next(id);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
