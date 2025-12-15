import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminFlightList } from './admin-flight-list';

describe('AdminFlightList', () => {
  let component: AdminFlightList;
  let fixture: ComponentFixture<AdminFlightList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminFlightList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminFlightList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
