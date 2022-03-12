import { Component, OnInit } from '@angular/core';
import { ConnectionsService } from '../connections.service';

@Component({
  selector: 'app-connections',
  templateUrl: './connections.component.html',
  styleUrls: ['./connections.component.css']
})
export class ConnectionsComponent implements OnInit {

  constructor(public connService: ConnectionsService) { }

  ngOnInit(): void {
  }

}
