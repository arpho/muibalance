import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSellerSelectorComponent } from './bottom-seller-selector.component';

describe('BottomSellerSelectorComponent', () => {
  let component: BottomSellerSelectorComponent;
  let fixture: ComponentFixture<BottomSellerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSellerSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSellerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
