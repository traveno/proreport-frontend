import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';

import { StatusLogService } from '../status-log.service';

@Component({
  selector: 'app-status-log',
  templateUrl: './status-log.component.html',
  styleUrls: ['./status-log.component.css']
})
export class StatusLogComponent implements OnInit, AfterViewInit, OnDestroy {
  loggerSub: Subscription;
  logs: string[] = [];

  text: string[] = [];
  @ViewChild('logBox') logElementRef!: ElementRef;

  constructor(private logger: StatusLogService) {
    this.loggerSub = this.logger.getMessage().subscribe(this.appendLog);
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    console.log(this.logElementRef);
    
  }

  appendLog(message: string) {
    this.logs.push(message);
  }

  ngOnDestroy(): void {
    this.loggerSub.unsubscribe();
  }
}
