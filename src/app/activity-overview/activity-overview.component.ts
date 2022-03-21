import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
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

  constructor(public dbService: DatabaseService, public defService: DefinitionsService) { }

  ngOnInit(): void {
  }

  getDepartmentActivity(dept: DeptObj): any {
    if (!this.dbService.isInitialized())
      return;

    let temp = new Array();

    for (let resource of dept.machines)
      temp.push(this.generateActivityRow(resource));

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