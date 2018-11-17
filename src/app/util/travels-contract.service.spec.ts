import { TestBed } from '@angular/core/testing';

import { TravelsContractService } from './travels-contract.service';

describe('TravelsContractService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TravelsContractService = TestBed.get(TravelsContractService);
    expect(service).toBeTruthy();
  });
});
