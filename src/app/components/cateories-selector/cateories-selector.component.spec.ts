import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CateoriesSelectorComponent } from './cateories-selector.component';

describe('CateoriesSelectorComponent', () => {
  let component: CateoriesSelectorComponent;
  let fixture: ComponentFixture<CateoriesSelectorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CateoriesSelectorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CateoriesSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
