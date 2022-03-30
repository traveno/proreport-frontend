import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }


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
}

export interface ResourceActivity {
  active: number;
  mfgcomplete: number;
  shipped: number;
  invoiced: number
}

export interface PS_RoutingRow {
  id: number;
  op: string;
  opDesc: string;
  resource: string;
  completeTotal: number;
  completeDate: Date;
}