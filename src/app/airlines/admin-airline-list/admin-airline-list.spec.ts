import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAirlineList } from './admin-airline-list';

describe('AdminAirlineList', () => {
  let component: AdminAirlineList;
  let fixture: ComponentFixture<AdminAirlineList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAirlineList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAirlineList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
