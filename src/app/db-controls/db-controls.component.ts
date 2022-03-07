import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


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
      <button type="button" class="btn" (click)="modal.close()">Nevermind</button>
      <button type="button" class="btn btn-danger" (click)="modal.close()">I'm sure</button>
  </div>
  `
})
export class ModalNewDb {
  constructor(public modal: NgbActiveModal) {}
}

@Component({
  selector: 'app-db-controls',
  templateUrl: './db-controls.component.html',
  styleUrls: ['./db-controls.component.css']
})
export class DbControlsComponent implements OnInit {

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  openModal() {
    const modalRef = this.modalService.open(ModalNewDb);
    modalRef.componentInstance.name = 'World';
  }

}
