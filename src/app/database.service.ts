import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Subject } from 'rxjs';
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

  getMatchingWordOrders(options: PS_Database_Filter): PS_WorkOrder[] {
    return ProData.getMatchingWorkOrders(options);
  }

  exportDatedCSV(fromDate: Date, toDate: Date): void {
    let csvContent: string = 'data:text/csv;charset=utf-8,';
    let workorders = ProData.getAllWorkOrders();

    for (let wo of workorders) {


      let op60  = wo.getRoutingTableRow('60');
      let op500 = wo.getRoutingTableRow('500');

      if (op60) {
        console.log(op60.completeTotal);
        // Check if OP is complete and we're inside date range
        if (op60.complete && op60.completeDate !== undefined) {
          if (op60.completeDate > fromDate && op60.completeDate < toDate) {
            csvContent += op60.completeDate.toDateString() + ',';
            csvContent += wo.index + ',';
            csvContent += op60.op + ',';
            csvContent += op60.opDesc + ',';
            csvContent += op60.resource + ',';
            csvContent += op60.completeTotal + ',';
            csvContent += wo.orderValue + ',';
            csvContent += wo.orderQuantity + ',';
            // Per piece
            csvContent += '-1\n';
          }
        }
      }

      if (op500) {
        // Check if OP is complete and we're inside date range
        if (op500.complete && op500.completeDate) {
          if (op500.completeDate > fromDate && op500.completeDate < toDate) {
            csvContent += op500.completeDate.toDateString() + ',';
            csvContent += wo.index + ',';
            csvContent += op500.op + ',';
            csvContent += op500.opDesc + ',';
            csvContent += op500.resource + ',';
            csvContent += ','; // Complete total is always 0
            csvContent += wo.orderValue + ',';
            csvContent += wo.orderQuantity + ',';
            // Per piece
            csvContent += '-1\n';
          }
        }
      }
    }
    
    let encodedURI: string = encodeURI(csvContent);
    let downloadButton = document.createElement("a");
    downloadButton.setAttribute('href', encodedURI);
    downloadButton.setAttribute('download', 'exported_data');
    document.body.appendChild(downloadButton);
    downloadButton.click();

    console.log(fromDate);
    console.log(toDate);
    console.log(toDate > fromDate)
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

  updateDatabase(options: ProData.PS_Update_Options) {
    ProData.buildUpdateList(options);
  }

  saveDatabase(): void {
    ProData.saveDatabase();
  }
}
