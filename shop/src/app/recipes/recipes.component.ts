import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../shared/services/recipe.service';
import { Recipe } from './recipe.model';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit {

  recipeDisplay: Recipe;
  constructor(private rs: RecipeService) { }

  ngOnInit(): void {
    this.rs.recipeSelected.subscribe(
      (recipe:Recipe) => {
        this.recipeDisplay = recipe;
      }
    )
  }

}
