import { TestBed } from '@angular/core/testing';

import { InstantMessageService } from './instant-message.service';

describe('InstantMessageService', () => {
  let service: InstantMessageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InstantMessageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
