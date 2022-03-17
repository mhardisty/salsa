import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TosJokeComponent } from './tos-joke.component';

describe('TosJokeComponent', () => {
  let component: TosJokeComponent;
  let fixture: ComponentFixture<TosJokeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TosJokeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TosJokeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
