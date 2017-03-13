/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { OfferShoppingService } from './offer-shopping.service';

describe('OfferShoppingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [OfferShoppingService]
    });
  });

  it('should ...', inject([OfferShoppingService], (service: OfferShoppingService) => {
    expect(service).toBeTruthy();
  }));
});
