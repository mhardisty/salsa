import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyCreatorComponent } from './key-creator.component';

describe('KeyCreatorComponent', () => {
  let component: KeyCreatorComponent;
  let fixture: ComponentFixture<KeyCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
