import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SolanaPayProcessorComponent } from './solana-pay-processor.component';

describe('SolanaPayProcessorComponent', () => {
  let component: SolanaPayProcessorComponent;
  let fixture: ComponentFixture<SolanaPayProcessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SolanaPayProcessorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SolanaPayProcessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
