import { TestBed } from '@angular/core/testing';

import { BasicApiService } from './basic-api.service';

describe('BasicApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: BasicApiService = TestBed.get(BasicApiService);
    expect(service).toBeTruthy();
  });
});
