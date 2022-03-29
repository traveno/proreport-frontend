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

  getResourceActivity() {
    return this.http.get<Map<string, ResourceActivity>>('/api/resource_activity');
  }
}

export interface PS_WorkOrder {
  index: string;
  status: number;
  orderQuantity: number;
}

export interface ResourceActivity {
  active: number,
  mfgcomplete: number,
  shipped: number,
  invoiced: number
}