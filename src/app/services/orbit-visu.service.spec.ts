import { TestBed } from '@angular/core/testing';

import { OrbitVisuService } from './orbit-visu.service';

describe('OrbitVisuService', () => {
  let service: OrbitVisuService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrbitVisuService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
