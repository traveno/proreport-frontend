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

  activityMap = new Map<string, PS_WorkOrder[]>();

  constructor(public dbService: DatabaseService, public defService: DefinitionsService,
              public apiService: ApiService) { }

  ngOnInit(): void {
    for (let dept of this.defService.getDefinitions().departments) {
      for (let machine of dept.machines) {
        this.apiService.getWorkOrdersByResource(machine).subscribe(results => {
          this.activityMap.set(machine, results);
        });
      }
    }
  }

  getResourceActivityByStatus(resource: string, status: PS_WorkOrder_Status): number {
    let temp = 0;

    let resourceActivity = this.activityMap.get(resource);
    if (resourceActivity === undefined) return -1;

    for (let wo of resourceActivity) {
      if (wo.status === status)
        temp++;
    }

    return temp;
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