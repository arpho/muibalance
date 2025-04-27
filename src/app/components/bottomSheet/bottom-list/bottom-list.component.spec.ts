import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BottomListComponent } from './bottom-list.component';

describe('BottomListComponent', () => {
  let component: BottomListComponent;
  let fixture: ComponentFixture<BottomListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BottomListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BottomListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
