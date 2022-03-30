import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { PS_WorkOrder } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class UpdateStatsService {

  private updateInfo: UpdateInfo[] = [];
  private totalRecords = 0;

  constructor(private http: HttpClient) {
    this.init();
  }

  init() {
    this.http.get<UpdateInfo[]>('/api/updateinfos').subscribe(results => {
      results.forEach(result => {
        this.updateInfo.push({
          timeStarted: new Date(result.timeStarted),
          timeEnded: new Date(result.timeEnded),
          numRecordsUpdated: result.numRecordsUpdated
        })
      });
    });

    this.http.get<PS_WorkOrder[]>('/api/workorders').subscribe(results => {
      this.totalRecords = results.length;
    });
  }

  getLatestUpdateInfo(): UpdateInfo {
    let latest = this.updateInfo[this.updateInfo.length - 1];

    if (latest === undefined)
      latest = {
        timeStarted: new Date(),
        timeEnded: new Date(),
        numRecordsUpdated: -1
      }

    return latest;
  }

  getTotalRecords(): number {
    return this.totalRecords;
  }
}

export interface UpdateInfo {
  timeStarted: Date;
  timeEnded: Date;
  numRecordsUpdated: number;
}