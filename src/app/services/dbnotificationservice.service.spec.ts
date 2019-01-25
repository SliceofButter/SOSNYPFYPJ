import { TestBed } from '@angular/core/testing';

import { DbnotificationserviceService } from './dbnotificationservice.service';

describe('DbnotificationserviceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DbnotificationserviceService = TestBed.get(DbnotificationserviceService);
    expect(service).toBeTruthy();
  });
});
