import { TestBed } from '@angular/core/testing';

import { LocalizationApiService } from './local-api.service';

describe('LocalizationApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LocalizationApiService = TestBed.get(LocalizationApiService);
    expect(service).toBeTruthy();
  });
});
