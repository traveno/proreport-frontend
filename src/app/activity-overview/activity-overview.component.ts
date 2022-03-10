import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';
import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';
import { PS_WorkOrder_Status } from '../proshop/WorkOrder';

@Component({
  selector: 'app-activity-overview',
  templateUrl: './activity-overview.component.html',
  styleUrls: ['./activity-overview.component.css']
})
export class ActivityOverviewComponent implements OnInit {
  MACHINES: string[] = ['HAAS', 'DMU', 'MAM', 'MAK', 'LATHE'];

  active = 0;

  constructor(public dbService: DatabaseService) { }

  ngOnInit(): void {
  }

  getMachineActivity(machine: string): any {
    if (!this.dbService.isInitialized())
      return;

    let temp = new Array();

    if (machine === 'HAAS') {
      for (let i = 1; i <= 7; i++)
        temp.push(this.generateActivityRow(machine + i));
      temp.push(this.generateActivityRow('ROBO'));
    }

    if (machine === 'DMU')
      for (let i = 1; i <= 4; i++)
        temp.push(this.generateActivityRow(machine + i));
    

    if (machine === 'MAM')
      for (let i = 1; i <= 3; i++)
        temp.push(this.generateActivityRow(machine + i));
    

    if (machine === 'MAK')
      for (let i = 1; i <= 7; i++)
        temp.push(this.generateActivityRow(machine + i));
    

    if (machine === 'LATHE') {
        temp.push(this.generateActivityRow('NL2500'));
        temp.push(this.generateActivityRow('NLX2500'));
        temp.push(this.generateActivityRow('NT1000'));
        temp.push(this.generateActivityRow('NTX2000'));
        temp.push(this.generateActivityRow('L2-20'));
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
