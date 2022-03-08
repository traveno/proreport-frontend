import { HttpClient } from '@angular/common/http';
import { HtmlParser } from '@angular/compiler';
import { Injectable } from '@angular/core';
import $ from "cash-dom";

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  constructor(private http: HttpClient) {
    http.get('https://machinesciences.adionsystems.com', { responseType: 'text', observe: 'body' }).subscribe(data => {
      const domParser = new DOMParser();
      const htmlElement = domParser.parseFromString(data, 'text/html');
      console.log($(htmlElement).find('span.user_name').text());
    });
  }
}
