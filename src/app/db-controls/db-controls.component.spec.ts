import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DbControlsComponent } from './db-controls.component';

describe('DbControlsComponent', () => {
  let component: DbControlsComponent;
  let fixture: ComponentFixture<DbControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DbControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DbControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
