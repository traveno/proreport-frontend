import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { DatabaseService } from '../database.service';
import { PS_Update_Options } from '../proshop/ProData';

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
    active: new FormControl(false),
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


  constructor(public dbService: DatabaseService) { }

  ngOnInit(): void {
    console.log(this.statuses.getRawValue());
  }

  submit() {
    let options: PS_Update_Options = {
      statuses: new Array(),
      queries: new Array(),
      machines: new Array(),
      fetchExternal: this.locations.getRawValue().proshop,
      fetchInternal: this.locations.getRawValue().database
    }

    let deptValues = this.departments.getRawValue();

    if (deptValues.haas) {
      options.queries.push();
      options.machines.push()
    }

    console.log(options);
  }
}
