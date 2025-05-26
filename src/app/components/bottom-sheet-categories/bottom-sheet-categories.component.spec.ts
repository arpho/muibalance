import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomSheetCategoriesComponent } from './bottom-sheet-categories.component';

describe('BottomSheetCategoriesComponent', () => {
  let component: BottomSheetCategoriesComponent;
  let fixture: ComponentFixture<BottomSheetCategoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomSheetCategoriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomSheetCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
