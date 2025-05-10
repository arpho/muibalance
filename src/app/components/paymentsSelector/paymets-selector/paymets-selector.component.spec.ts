import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymetsSelectorComponent } from './paymets-selector.component';

describe('PaymetsSelectorComponent', () => {
  let component: PaymetsSelectorComponent;
  let fixture: ComponentFixture<PaymetsSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaymetsSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaymetsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
