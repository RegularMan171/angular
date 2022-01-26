import { Component, OnInit } from '@angular/core';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;

  constructor(private dss: DataStorageService) { }

  ngOnInit(): void {
  }

  onSaveData() {
    this.dss.storeRecipes();
  }
  onFetchData() {
    this.dss.fetchRecipes().subscribe()
  }
}
