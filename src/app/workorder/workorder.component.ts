import { Component, OnInit } from '@angular/core';
import { debounceTime, distinctUntilChanged, filter, map, Observable, OperatorFunction } from 'rxjs';
import { ApiService, PS_WorkOrder } from '../api.service';
import { PS_WorkOrder_Status } from '../proshop/WorkOrder';

@Component({
  selector: 'app-workorder',
  templateUrl: './workorder.component.html',
  styleUrls: ['./workorder.component.css']
})
export class WorkorderComponent implements OnInit {
  workorders: PS_WorkOrder[] = [];
  public model: PS_WorkOrder | undefined;

  formatter = (wo: PS_WorkOrder) => wo.index;

  search: OperatorFunction<string, PS_WorkOrder[]> = (text$: Observable<string>) => text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    filter(term => term.length >= 2),
    map(term => this.workorders.filter(wo => new RegExp(term, 'mi').test(wo.index)).slice(0, 10))
  )


  constructor(private apiService: ApiService) { }

  ngOnInit(): void {
    this.apiService.getGlobalWorkOrderList().subscribe(results => {
      this.workorders = results;
      console.log(results);
    });
  }

  statusEnumToString(code: number): string {
    if (code === PS_WorkOrder_Status.ACTIVE)
      return 'ACTIVE';
    else if (code === PS_WorkOrder_Status.CANCELED)
      return 'CANCELED';
    else if (code === PS_WorkOrder_Status.COMPLETE)
      return 'COMPLETE';
    else if (code === PS_WorkOrder_Status.INVOICED)
      return 'INVOICED';
    else if (code === PS_WorkOrder_Status.MANUFACTURING_COMPLETE)
      return 'MFG. COMPLETE';
    else if (code === PS_WorkOrder_Status.ON_HOLD)
      return 'ON_HOLD';
    else if (code === PS_WorkOrder_Status.SHIPPED)
      return 'SHIPPED';
    else 
      return 'UNKNOWN';
  }
}