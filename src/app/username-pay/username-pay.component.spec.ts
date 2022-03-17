import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsernamePayComponent } from './username-pay.component';

describe('UsernamePayComponent', () => {
  let component: UsernamePayComponent;
  let fixture: ComponentFixture<UsernamePayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsernamePayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsernamePayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
