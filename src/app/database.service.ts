import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PS_Database_Filter } from './proshop/Database';

import * as ProData from './proshop/ProData';
import { PS_WorkOrder, PS_WorkOrder_Status } from './proshop/WorkOrder';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  logEmitter = new Subject<string>();
  dbStatusEmitter = new Subject<any>();
  testdata = ['test data1', 'test data5', 'test data214'];

  constructor(private http: HttpClient) {
    ProData.registerStatusUpdateCallback((data: ProData.PS_Status_Update) => this.statusCallback(data));
  }

  isInitialized(): boolean {
    return ProData.isCacheInitialized();
  }

  getLogEmitter() {
    return this.logEmitter;
  }

  addActivity() {
    this.testdata.push(new Date().toDateString());
  }

  getMatchingWordOrders(options: PS_Database_Filter): PS_WorkOrder[] {
    return ProData.getMatchingWorkOrders(options);
  }

  async loadDatabase(file: File) {
    await ProData.loadDatabase(file);
    this.dbStatusEmitter.next({
      status: ProData.getDatabaseStatus(),
      entries: ProData.getNumberOfEntries(),
      timestamp: ProData.getDataTimestamp()
    });
  }

  statusCallback(data: ProData.PS_Status_Update) {
    if (data.log)
      this.logEmitter.next(data.log);
    if (data.status)
      this.logEmitter.next(data.status);
  }

  newDatabase() {
    let options: ProData.PS_Update_Options = {
      statuses: new Array(),
      queries: new Array(),
      machines: new Array(),
      fetchExternal: true,
      fetchInternal: true
    };

    // Status criteria

    options.statuses.push(PS_WorkOrder_Status.ACTIVE);
    options.statuses.push(PS_WorkOrder_Status.MANUFACTURING_COMPLETE);
    options.statuses.push(PS_WorkOrder_Status.SHIPPED);
    options.statuses.push(PS_WorkOrder_Status.ON_HOLD);
    options.statuses.push(PS_WorkOrder_Status.CANCELED);
    options.statuses.push(PS_WorkOrder_Status.INVOICED);
    options.statuses.push(PS_WorkOrder_Status.COMPLETE);

    // Department criteria
    options.queries.push("query56");
    options.queries.push("query55");
    options.queries.push("query58");
    options.queries.push("query57");
    options.queries.push("query59");

    ProData.newDatabase(options);
  }
}
