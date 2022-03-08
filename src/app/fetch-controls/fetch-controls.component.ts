import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

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


  constructor() { }

  ngOnInit(): void {
  }

  submit() {
  }
}
