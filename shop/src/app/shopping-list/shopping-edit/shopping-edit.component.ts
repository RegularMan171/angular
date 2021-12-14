import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild('nameInput', {static:true}) nameInputElem: ElementRef;
  @ViewChild('amountInput', {static:true}) amountInputElem: ElementRef;
  constructor() { }

  @Output() ingredient = new EventEmitter<Ingredient>();

  ngOnInit(): void {
  }
  onAddIngredient() {
    const newIngredient = new Ingredient(this.nameInputElem.nativeElement.value, this.amountInputElem.nativeElement.value);
    this.ingredient.emit(newIngredient)
  }

}
