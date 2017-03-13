/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { PopUpService } from './pop-up.service';

describe('PopUpService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PopUpService]
    });
  });

  it('should ...', inject([PopUpService], (service: PopUpService) => {
    expect(service).toBeTruthy();
  }));
});
