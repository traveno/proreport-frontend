import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-activity-overview',
  templateUrl: './activity-overview.component.html',
  styleUrls: ['./activity-overview.component.css']
})
export class ActivityOverviewComponent implements OnInit {
  MACHINES: string[] = ['HAAS', 'DMU', 'MAM', 'MAK', 'LATHE'];

  active = 0;

  constructor() { }

  ngOnInit(): void {
  }

}
