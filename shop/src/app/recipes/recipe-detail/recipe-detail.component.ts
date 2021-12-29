import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeService } from 'src/app/shared/services/recipe.service';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {

  recipe: Recipe;
  id: number;
  constructor(private rs: RecipeService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipe = this.rs.getRecipe(this.id);
      }
    );
  }

  toShoppingList() {
    this.rs.addIngredientsToList(this.recipe.ingredients);
  }

}
