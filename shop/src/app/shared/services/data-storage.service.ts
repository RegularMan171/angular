import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { consts } from '../../consts';
import { Recipe } from 'src/app/recipes/recipe.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private rs: RecipeService) { }

  storeRecipes() {
    const recipes = this.rs.getRecipes()
    console.log(consts.firebase_url);
    this.http.put(consts.firebase_url, recipes).subscribe(
      response => {
        console.log(response);
      }
    );
  }

  fetchRecipes() {
    return this.http.get<Recipe[]>(consts.firebase_url)
    .pipe(
      map(recipes => {
        return recipes.map(recipe => {
          return {
            ...recipe,
            ingredients: recipe.ingredients ? recipe.ingredients : []
          };
      });
    }),
    tap(recipes => {
      this.rs.setRecipes(recipes);
    }));
  }
}
