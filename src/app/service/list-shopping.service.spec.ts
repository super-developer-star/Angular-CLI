/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ListShoppingService } from './list-shopping.service';

describe('ListShoppingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ListShoppingService]
    });
  });

  it('should ...', inject([ListShoppingService], (service: ListShoppingService) => {
    expect(service).toBeTruthy();
  }));
});
