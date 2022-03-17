import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAndPayComponent } from './select-and-pay.component';

describe('SelectAndPayComponent', () => {
  let component: SelectAndPayComponent;
  let fixture: ComponentFixture<SelectAndPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectAndPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAndPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
