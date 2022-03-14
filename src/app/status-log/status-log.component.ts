import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { DatabaseService } from '../database.service';

import { StatusLogService } from '../status-log.service';

@Component({
  selector: 'app-status-log',
  templateUrl: './status-log.component.html',
  styleUrls: ['./status-log.component.css']
})
export class StatusLogComponent implements OnInit, AfterViewInit, OnDestroy {
  text: string[] = [];
  @ViewChild('logBox') logElementRef!: ElementRef;

  constructor(private dbService: DatabaseService) {
  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.dbService.getLogEmitter().subscribe((log) => {
      this.text.push(log);
      this.redrawLog();
    });
  }

  redrawLog() {
    this.logElementRef.nativeElement.innerHTML = '';
    for (let t of this.text)
      if (this.text.indexOf(t) === 0)
        this.logElementRef.nativeElement.innerHTML = t;
      else
        this.logElementRef.nativeElement.innerHTML = `${this.logElementRef.nativeElement.innerHTML}\n${t}`;


    this.logElementRef.nativeElement.scrollTop = this.logElementRef.nativeElement.scrollHeight;
  }

  ngOnDestroy(): void {
    // Unsubscribing causes an error on router navigation?
    // this.dbService.getLogEmitter().unsubscribe();
  }
}
