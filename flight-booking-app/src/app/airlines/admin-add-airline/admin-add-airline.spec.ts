import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddAirline } from './admin-add-airline';

describe('AdminAddAirline', () => {
  let component: AdminAddAirline;
  let fixture: ComponentFixture<AdminAddAirline>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAddAirline]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAddAirline);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
