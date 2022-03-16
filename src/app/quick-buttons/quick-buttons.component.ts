import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-quick-buttons',
  templateUrl: './quick-buttons.component.html',
  styleUrls: ['./quick-buttons.component.css']
})
export class QuickButtonsComponent implements OnInit {

  hoveredDate: NgbDate | null = null;

  fromDate: NgbDate;
  toDate: NgbDate | null = null;

  constructor(public dbService: DatabaseService, calendar: NgbCalendar) {
    this.fromDate = calendar.getNext(calendar.getToday(), 'd', -14);
    this.toDate = calendar.getToday();
  }

  ngOnInit(): void {
  }

  readyToSubmit(): boolean {
    return this.dbService.isInitialized();
  }

  submit(): void {
    if (this.toDate === null) return;

    let jsFromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day  );
    let jsToDate   = new Date(this.toDate.year,   this.toDate.month   - 1, this.toDate.day + 1);

    this.dbService.exportDatedCSV(jsFromDate, jsToDate);
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
    } else {
      this.toDate = null;
      this.fromDate = date;
    }
  }

  isHovered(date: NgbDate) {
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || (this.toDate && date.equals(this.toDate)) || this.isInside(date) || this.isHovered(date);
  }
}
