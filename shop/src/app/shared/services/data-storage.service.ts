import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { RecipeService } from './recipe.service';
import { consts } from '../../consts';
import { Recipe } from 'src/app/recipes/recipe.model';
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(private http: HttpClient, private rs: RecipeService, private as: AuthService) { }

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
    
      return this.http.get<Recipe[]>(consts.firebase_url).pipe(
         map(recipes => {
      return recipes.map(recipe => {
        return {
          ...recipe,
          ingredients: recipe.ingredients ? recipe.ingredients : []
        };
      });
    }), tap(recipes => {
      this.rs.setRecipes(recipes);
    }));
  }
}
