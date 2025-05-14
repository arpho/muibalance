import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsSelectorComponent } from './paymets-selector.component';

describe('PaymetsSelectorComponent', () => {
  let component: PaymentsSelectorComponent;
  let fixture: ComponentFixture<PaymentsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
