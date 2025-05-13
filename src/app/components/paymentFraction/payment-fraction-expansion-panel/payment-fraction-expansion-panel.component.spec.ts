import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentFractionExpansionPanelComponent } from './payment-fraction-expansion-panel.component';

describe('PaymentFractionExpansionPanelComponent', () => {
  let component: PaymentFractionExpansionPanelComponent;
  let fixture: ComponentFixture<PaymentFractionExpansionPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymentFractionExpansionPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymentFractionExpansionPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
