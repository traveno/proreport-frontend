import { Component, ViewChild } from '@angular/core';
import { from } from 'rxjs';
import $ from 'cash-dom';
import { DatabaseService } from './database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  databaseLoaded = false;

  title = 'shop-meister';

  constructor(private dbService: DatabaseService) { }

  isDatabaseLoaded(): boolean {
    return this.dbService.isInitialized();
  }
  
}

async function test(): Promise<void> {
  const response = from(fetch('https://machinesciences.adionsystems.com').then(res => res.text()));
  response.subscribe(result => {
    console.log($('span.user_name'));
  });
}