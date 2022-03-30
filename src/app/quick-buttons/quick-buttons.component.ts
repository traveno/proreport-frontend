import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDate } from '@ng-bootstrap/ng-bootstrap';
import { ApiService, PS_RoutingRow, PS_WorkOrder } from '../api.service';
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

  constructor(public dbService: DatabaseService, public apiService: ApiService, calendar: NgbCalendar) {
    this.fromDate = calendar.getNext(calendar.getToday(), 'd', -14);
    this.toDate = calendar.getToday();
  }

  ngOnInit(): void {
  }

  readyToSubmit(): boolean {
    return true;
  }

  submit(): void {
    if (this.toDate === null) return;

    let jsFromDate = new Date(this.fromDate.year, this.fromDate.month - 1, this.fromDate.day  );
    let jsToDate   = new Date(this.toDate.year,   this.toDate.month   - 1, this.toDate.day + 1);

    // this.dbService.exportDatedCSV(jsFromDate, jsToDate);
    this.apiService.getWorkOrdersByRoutingActivity(jsFromDate, jsToDate).subscribe(results => {
      this.saveToCSV(results, jsFromDate, jsToDate);
    });
  }

  saveToCSV(workorders: PS_WorkOrder[], fromDate: Date, toDate: Date) {
    let csvContent: string = 'data:text/csv;charset=utf-8,';

    for (let wo of workorders) {
      let op60: PS_RoutingRow | undefined = wo.routingRows.find(e => e.op === '60');
      let op500: PS_RoutingRow | undefined = wo.routingRows.find(e => e.op === '500');

      if (op60 && op60.completeDate) {
        if (new Date(op60.completeDate) > fromDate && new Date(op60.completeDate) < toDate) {
          csvContent += new Date(op60.completeDate).toDateString() + ',';
          csvContent += wo.index + ',';
          csvContent += op60.op + ',';
          csvContent += op60.opDesc + ',';
          csvContent += op60.resource + ',';
          csvContent += op60.completeTotal + ',';
          csvContent += wo.orderQuantity + ',';
          // Per piece
          csvContent += '-1\n';
        }
      }

      if (op500 && op500.completeDate) {
        if (new Date(op500.completeDate) > fromDate && new Date(op500.completeDate) < toDate) {
          csvContent += new Date(op500.completeDate).toDateString() + ',';
          csvContent += wo.index + ',';
          csvContent += op500.op + ',';
          csvContent += op500.opDesc + ',';
          csvContent += op500.resource + ',';
          csvContent += ','; // Complete total is always 0
          csvContent += wo.orderQuantity + ',';
          // Per piece
          csvContent += '-1\n';
        }
      }
    }

    let encodedURI: string = encodeURI(csvContent);
    let downloadButton = document.createElement("a");
    downloadButton.setAttribute('href', encodedURI);
    downloadButton.setAttribute('download', 'exported_data');
    document.body.appendChild(downloadButton);
    downloadButton.click();
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
