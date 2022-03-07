import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FetchControlsComponent } from './fetch-controls.component';

describe('FetchControlsComponent', () => {
  let component: FetchControlsComponent;
  let fixture: ComponentFixture<FetchControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FetchControlsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FetchControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
