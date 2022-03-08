import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import $ from 'cash-dom';

@Injectable({
  providedIn: 'root'
})
export class ConnectionsService {
  private isConnected: boolean = false;
  private userId: number = -1;
  private permissions = {
    workorders: false,
    parts: false,
    sensitive: false
  };

  constructor(private http: HttpClient) {
    this.checkConnection();
  }

  getConnected(): boolean {
    return this.isConnected;
  }

  getPermissions() {
    return this.permissions;
  }

  getUserId(): number {
    return this.userId;
  }

  checkConnection(): void {
    this.http.get('https://machinesciences.adionsystems.com/procnc', { responseType: 'text', observe: 'body' }).subscribe(data => {
      const domParser = new DOMParser();
      const htmlElement = domParser.parseFromString(data, 'text/html');

      if ($(htmlElement).find('span.user_name').length) {
        this.isConnected = true;
        this.userId = Number($(htmlElement).find('#main-menu > li.right.personal_link > a').attr('href')?.split('users/')[1]);
        this.checkPermissions();
      } else
        this.isConnected = false;
    });
  }

  checkPermissions(): void {
    if (!this.isConnected || this.userId === -1)
      return;

    this.http.get(`https://machinesciences.adionsystems.com/procnc/users/${this.userId}$formName=userAccessLevels`, { responseType: 'text', observe: 'body' }).subscribe(data => {
      const domParser = new DOMParser();
      const htmlElement = domParser.parseFromString(data, 'text/html');

      if ($(htmlElement).find('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(39) > td:nth-child(2) > span').length)
        this.permissions.workorders = true;
      if ($(htmlElement).find('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(23) > td:nth-child(2) > span').length)
        this.permissions.parts = true;
      if ($(htmlElement).find('body > table > tbody > tr:nth-child(2) > td > table > tbody > tr > td:nth-child(2) > table > tbody > tr:nth-child(96) > td > span').length)
        this.permissions.sensitive = true;
    });
  }
}