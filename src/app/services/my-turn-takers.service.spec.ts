import { TestBed } from '@angular/core/testing';

import { MyTurnTakersService } from './my-turn-takers.service';

describe('MyTurnTakersService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MyTurnTakersService = TestBed.get(MyTurnTakersService);
    expect(service).toBeTruthy();
  });
});
