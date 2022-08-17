import { TestBed } from '@angular/core/testing';

import { CustomMatPaginatorIntService } from './custom-mat-paginator-int.service';

describe('CustomMatPaginatorIntService', () => {
  let service: CustomMatPaginatorIntService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomMatPaginatorIntService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
