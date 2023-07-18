import { TestBed } from '@angular/core/testing';

import { PowerbiInterceptor } from './powerbi.interceptor';

describe('PowerbiInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      PowerbiInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: PowerbiInterceptor = TestBed.inject(PowerbiInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
