import { TestBed, inject } from '@angular/core/testing';

import { HerosServiceService } from './heros-service.service';

describe('HerosServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HerosServiceService]
    });
  });

  it('should be created', inject([HerosServiceService], (service: HerosServiceService) => {
    expect(service).toBeTruthy();
  }));
});
