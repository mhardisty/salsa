import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GotoLoginComponent } from './goto-login.component';

describe('GotoLoginComponent', () => {
  let component: GotoLoginComponent;
  let fixture: ComponentFixture<GotoLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GotoLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GotoLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
