import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbCalendar, NgbDate, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DatabaseService } from '../database.service';
import { PS_Database_Status } from '../proshop/Database';


@Component({
  selector: 'modal-new-db',
  template: `
  <div class="modal-header">
    <h4 class="modal-title" id="modal-basic-title">Are you sure?</h4>
    <button type="button" class="btn-close" aria-label="Close" (click)="modal.dismiss()"></button>
  </div>
  <div class="modal-body">
      <p>Creating a new database will take some time. Like, a lot of time.</p>
  </div>
  <div class="modal-footer">
      <button type="button" class="btn" (click)="modal.close(false)">Nevermind</button>
      <button type="button" class="btn btn-danger" (click)="modal.close(true)">I'm sure</button>
  </div>
  `
})
export class ModalNewDb {
  constructor(public modal: NgbActiveModal) {}

  close() {
  }
}

@Component({
  selector: 'app-db-controls',
  templateUrl: './db-controls.component.html',
  styleUrls: ['./db-controls.component.css']
})
export class DbControlsComponent implements OnInit {
  status: PS_Database_Status | undefined;
  entries: number | undefined;
  timestamp: string | undefined;

  constructor(private modalService: NgbModal, public dbService: DatabaseService) { }

  ngOnInit(): void {
    this.dbService.dbStatusEmitter.subscribe(data => {
      this.status = data.status;
      this.entries = data.entries;
      this.timestamp = getSimpleDate(data.timestamp);
    });
  }

  loadDatabaseFromFile(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files;

    if (files)
      this.dbService.loadDatabase(files[0]);
  }

  openModal() {
    const modalRef = this.modalService.open(ModalNewDb);
    modalRef.closed.subscribe((accept) => { if (accept) this.dbService.newDatabase(); });
  }
}

function getSimpleDate(time: Date): string {
  let temp: string = "";

  temp += (time.getMonth() + 1) + "/";
  temp +=  time.getDate()       + "/";
  temp +=  time.getFullYear()   + " ";
  temp +=  time.getHours()      + ":";
  temp +=  time.getMinutes();

  return temp;
}
