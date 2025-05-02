import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerSelectorComponent } from './seller-selector.component';

describe('SellerSelectorComponent', () => {
  let component: SellerSelectorComponent;
  let fixture: ComponentFixture<SellerSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
