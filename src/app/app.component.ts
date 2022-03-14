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

  constructor(private dbService: DatabaseService) {
    chrome.webRequest.onBeforeRequest.addListener(
      function(details) {
        console.log(details + 'ye');
        return {redirectUrl: 'google.com'};
      }, {
        urls: ["chrome-extension://" + chrome.runtime.id + "/index.html"]
      }, ['blocking']
    );
  }

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

window.onbeforeunload = event => {
  console.log(event);
  event.preventDefault();
  event.returnValue = 'You may have unsaved work...';
}