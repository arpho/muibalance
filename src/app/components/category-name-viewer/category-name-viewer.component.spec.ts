import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryNameViewerComponent } from './category-name-viewer.component';

describe('CategoryNameViewerComponent', () => {
  let component: CategoryNameViewerComponent;
  let fixture: ComponentFixture<CategoryNameViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoryNameViewerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoryNameViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
