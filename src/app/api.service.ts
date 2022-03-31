import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private globalWorkOrderList: PS_WorkOrder[] = [];

  constructor(private http: HttpClient) {
    this.http.get<PS_WorkOrder[]>('/api/workordersdetailed').subscribe(results => {
      this.globalWorkOrderList = results;
      console.log('done');
    });
  }

  getWorkOrdersDetailedList(): PS_WorkOrder[] {
    return this.globalWorkOrderList;
  }


  getGlobalWorkOrderList() {
    return this.http.get<PS_WorkOrder[]>('/api/workorders');
  }

  getWorkOrdersByResource(resource: string) {
    return this.http.get<PS_WorkOrder[]>(`/api/workorders/by_resource/${resource}`);
  }

  getWorkOrdersByRoutingActivity(fromDate: Date, toDate: Date) {
    return this.http.get<PS_WorkOrder[]>(`/api/workorders/by_routing_activity/${fromDate.toJSON()}/${toDate.toJSON()}`)
  }

  getResourceActivity() {
    return this.http.get<Map<string, ResourceActivity>>('/api/resource_activity');
  }

  getRoutingRowsByDate(fromDate: Date, toDate: Date) {
    return this.http.get<PS_RoutingRow>(`/api/routingrows/by_date/${fromDate.toJSON()}/${toDate.toJSON()}`);
  }
}

export interface PS_WorkOrder {
  index: string;
  status: number;
  orderQuantity: number;
  routingRows: PS_RoutingRow[];
  trackingRows: PS_TrackingRow[];
}

export interface ResourceActivity {
  active: number;
  mfgcomplete: number;
  shipped: number;
  invoiced: number
}

export interface PS_RoutingRow {
  op: string;
  opDesc: string;
  resource: string;
  completeTotal: number;
  completeDate: Date;
}

export interface PS_TrackingRow {
    dateStarted: Date;
    dateEnded: Date;
    op: string;
    resource: string;
    quantityStart: number;
    quantityEnd: number;
    quantityTotal: number;
}