import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerDialogComponent } from './seller-dialog.component';

describe('SellerDialogComponent', () => {
  let component: SellerDialogComponent;
  let fixture: ComponentFixture<SellerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SellerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SellerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
