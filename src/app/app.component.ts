import { Component, ViewChild } from '@angular/core';
import 'cheerio';
import { Cheerio, load } from 'cheerio';
import { from } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'shop-meister';

  constructor() {
    const $ = load('<h2 class="title">Hello world</h2>');
    test();
  }
  
}

async function test(): Promise<void> {
  const response = from(fetch('https://machinesciences.adionsystems.com').then(res => res.text()));
  response.subscribe(result => {
    const $ = load(result);
    console.log($('span.user_name'));
  });
}