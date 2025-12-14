import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlightListComponent } from './flight-list';

describe('FlightList', () => {
  let component: FlightListComponent;
  let fixture: ComponentFixture<FlightListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlightListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
