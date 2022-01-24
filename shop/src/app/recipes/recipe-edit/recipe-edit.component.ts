import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { RecipeService } from 'src/app/shared/services/recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup;

  // get controls() { // a getter!
  //   return (<FormArray>this.recipeForm.get('ingredients')).controls;
  // }

  constructor(private route: ActivatedRoute, private rs: RecipeService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  private initForm() {

    let recipeName='';
    let recipeImgPath = '';
    let recipeDesc = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode) {
      const recipe = this.rs.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImgPath = recipe.imagePath;
      recipeDesc = recipe.description;
      if(recipe['ingredients']) {
        for(let ing of recipe.ingredients) {
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ing.name),
              'amount': new FormControl(ing.amount)
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName),
      'imgPath': new FormControl(recipeImgPath),
      'description': new FormControl(recipeDesc)
    });
  }

  onSubmit() {
  console.log(this.recipeForm.value)
  }

    get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }


}
