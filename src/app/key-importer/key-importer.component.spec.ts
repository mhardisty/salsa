import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeyImporterComponent } from './key-importer.component';

describe('KeyImporterComponent', () => {
  let component: KeyImporterComponent;
  let fixture: ComponentFixture<KeyImporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KeyImporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KeyImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
