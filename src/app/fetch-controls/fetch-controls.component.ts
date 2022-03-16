import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ConnectionsService } from '../connections.service';
import { DatabaseService } from '../database.service';
import { DefinitionsService } from '../definitions.service';
import { PS_Update_Options } from '../proshop/ProData';
import { PS_WorkOrder_Status } from '../proshop/WorkOrder';

@Component({
  selector: 'app-fetch-controls',
  templateUrl: './fetch-controls.component.html',
  styleUrls: ['./fetch-controls.component.css']
})
export class FetchControlsComponent implements OnInit {
  // These are generated based on imported company definitions
  departments = new FormGroup({});

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


  constructor(public dbService: DatabaseService, public connService: ConnectionsService, public defService: DefinitionsService) { }

  ngOnInit(): void {
    // Import machine definitions
    for (let d of this.defService.getDefinitions().departments)
      this.departments.addControl(d.department.toString(), new FormControl(true));
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

    for (let d of this.defService.getDefinitions().departments) {
      if (this.departments.controls[d.department].value) {
        options.machines.push(...d.machines);
        options.queries.push(d.query);
      }
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
