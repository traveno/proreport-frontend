import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ApiService } from '../api.service';
import { DatabaseService } from '../database.service';
import { PS_Database_Status } from '../proshop/Database';
import { UpdateStatsService } from '../update-stats.service';

@Component({
  selector: 'app-db-controls',
  templateUrl: './db-controls.component.html',
  styleUrls: ['./db-controls.component.css']
})
export class DbControlsComponent implements OnInit {

  constructor(public updateStats: UpdateStatsService) { }

  ngOnInit(): void {
  }
 
  
  getSimpleDate(time: Date): string {
    let temp: string = "";
  
    temp += (time.getMonth() + 1) + "/";
    temp += time.getDate() + "/";
    temp += time.getFullYear() + " ";
    temp += ('0' + time.getHours()).slice(-2) + ":";
    temp += ('0' + time.getMinutes()).slice(-2);
  
    return temp;
  }
}


