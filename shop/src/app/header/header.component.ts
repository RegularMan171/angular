import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { DataStorageService } from '../shared/services/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  collapsed = true;
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private dss: DataStorageService, private as: AuthService) { }

  ngOnInit(): void {
    this.userSub = this.as.user.subscribe(
      user => {
        this.isAuthenticated = !!user;
        console.log(!user, !!user);
      });
  }

  onSaveData() {
    this.dss.storeRecipes();
  }
  onFetchData() {
    this.dss.fetchRecipes().subscribe()
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}
