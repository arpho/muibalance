/* tslint:disable:no-unused-variable */
import {ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { SuppliersListComponent } from './suppliersList.component';

describe('SuppliersListComponent', () => {
  let component: SuppliersListComponent;
  let fixture: ComponentFixture<SuppliersListComponent>;

  beforeEach((() => {
    TestBed.configureTestingModule({
      declarations: [ SuppliersListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuppliersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
