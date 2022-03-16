import { Component, OnInit } from '@angular/core';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(public dbService: DatabaseService) { }

  isDatabaseLoaded(): boolean {
    return this.dbService.isInitialized();
  }

  ngOnInit(): void {
  }

}
