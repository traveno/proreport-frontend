import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConnectionsService } from '../connections.service';
import { DatabaseService } from '../database.service';
import { PS_Update_Options } from '../proshop/ProData';
import { PS_WorkOrder_Status } from '../proshop/WorkOrder';

@Component({
  selector: 'app-fetch-controls',
  templateUrl: './fetch-controls.component.html',
  styleUrls: ['./fetch-controls.component.css']
})
export class FetchControlsComponent implements OnInit {
  departments = new FormGroup({
    haas: new FormControl(true),
    dmu: new FormControl(true),
    mam: new FormControl(true),
    mak: new FormControl(true),
    lathe: new FormControl(true)

  });
  statuses = new FormGroup({
    active: new FormControl(true),
    mfgcomplete: new FormControl(true),
    shipped: new FormControl(true),
    onhold: new FormControl(true),
    canceled: new FormControl(false),
    invoiced: new FormControl(false)
  });

  locations = new FormGroup({
    proshop: new FormControl(true),
    database: new FormControl(true)
  });


  constructor(public dbService: DatabaseService, public connService: ConnectionsService) { }

  ngOnInit(): void {
  }

  readyToSubmit(): boolean {
    return this.dbService.isInitialized() && this.connService.getConnected();
  }

  submit() {
    let options: PS_Update_Options = {
      statuses: [],
      queries: [],
      machines: [],
      fetchExternal: this.locations.getRawValue().proshop,
      fetchInternal: this.locations.getRawValue().database
    }

    let deptValues = this.departments.getRawValue();

    if (deptValues.haas) {
      options.queries.push('query56');
      options.machines.push('HAAS')
    }

    if (deptValues.dmu) {
      options.queries.push('query55');
      options.machines.push('DMU')
    }

    if (deptValues.mam) {
      options.queries.push('query58');
      options.machines.push('MAM')
    }

    if (deptValues.mak) {
      options.queries.push('query57');
      options.machines.push('MAK')
    }

    if (deptValues.lathe) {
      options.queries.push('query59');
      options.machines.push("NL2500");
      options.machines.push("NLX2500");
      options.machines.push("NT1000");
      options.machines.push("NTX2000");
      options.machines.push("L2-20");
    }

    let statusValues = this.statuses.getRawValue();

    if (statusValues.active)
      options.statuses.push(PS_WorkOrder_Status.ACTIVE);
    if (statusValues.mfgcomplete)
      options.statuses.push(PS_WorkOrder_Status.MANUFACTURING_COMPLETE);
    if (statusValues.shipped)
      options.statuses.push(PS_WorkOrder_Status.SHIPPED)
    if (statusValues.onhold)
      options.statuses.push(PS_WorkOrder_Status.ON_HOLD)
    if (statusValues.canceled)
      options.statuses.push(PS_WorkOrder_Status.CANCELED);
    if (statusValues.invoiced)
      options.statuses.push(PS_WorkOrder_Status.INVOICED)

    this.dbService.updateDatabase(options);
  }
}
