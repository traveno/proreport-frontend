import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { ApiService, PS_WorkOrder } from '../api.service';
import { DatabaseService } from '../database.service';
import { DefinitionsService, DeptObj } from '../definitions.service';
import { PS_WorkOrder_Status } from '../proshop/WorkOrder';

@Component({
  selector: 'app-activity-overview',
  templateUrl: './activity-overview.component.html',
  styleUrls: ['./activity-overview.component.css']
})
export class ActivityOverviewComponent implements OnInit {
  active = 0;

  constructor(public dbService: DatabaseService, public defService: DefinitionsService,
              public apiService: ApiService) { }

  ngOnInit(): void {
    // for (let dept of this.defService.getDefinitions().departments) {
    //   for (let machine of dept.machines) {
    //     // this.apiService.getWorkOrdersByResource(machine).subscribe(results => {
    //     //   this.activityMap.set(machine, getResourceActivityByStatus(machine));
    //     // });
    //   }
    // }
  }

  getResourceActivityByStatus(resource: string, status: PS_WorkOrder_Status): number {
    let workOrderList = this.filterWorkOrdersByResource(resource);
    let temp = 0;

    for (let wo of workOrderList) {
      if (wo.status === status)
        temp++;
    }

    return temp;
  }

  filterWorkOrdersByResource(resource: string): PS_WorkOrder[] {
    let globalList = this.apiService.getWorkOrdersDetailedList();
    let returnList: PS_WorkOrder[] = [];

    for (let wo of globalList) {
      for (let row of wo.routingRows) {
        if (row.resource === resource)
          returnList.push(wo);
      }
    }

    return returnList;
  }

  generateActivityRow(machine: string): any {
    return {
      name: machine,
      active: this.dbService.getMatchingWordOrders({ resource: machine, status: PS_WorkOrder_Status.ACTIVE }).length,
      mfgcomplete: this.dbService.getMatchingWordOrders({ resource: machine, status: PS_WorkOrder_Status.MANUFACTURING_COMPLETE }).length,
      shipped: this.dbService.getMatchingWordOrders({ resource: machine, status: PS_WorkOrder_Status.SHIPPED }).length,
      invoiced: this.dbService.getMatchingWordOrders({ resource: machine, status: PS_WorkOrder_Status.INVOICED }).length,
    }
  }
}