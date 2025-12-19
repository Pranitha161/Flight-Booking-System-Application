import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteBooking } from './delete-booking';

describe('DeleteBooking', () => {
  let component: DeleteBooking;
  let fixture: ComponentFixture<DeleteBooking>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DeleteBooking]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DeleteBooking);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
