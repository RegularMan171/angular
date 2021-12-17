import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/shared/services/shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static:true}) nameInputElem: ElementRef;
  @ViewChild('amountInput', {static:true}) amountInputElem: ElementRef;
  constructor(private sls: ShoppingListService) { }

  ngOnInit(): void {
  }
  onAddIngredient() {
    const newIngredient = new Ingredient(this.nameInputElem.nativeElement.value, this.amountInputElem.nativeElement.value);
    this.sls.addIngredient(newIngredient);
  }

}
