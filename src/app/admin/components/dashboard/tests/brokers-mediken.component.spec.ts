import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BrokersMedikenComponent } from '../controllers/brokers-mediken.component';

describe('BrokersComponent', () => {
  let component: BrokersMedikenComponent;
  let fixture: ComponentFixture<BrokersMedikenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BrokersMedikenComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BrokersMedikenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
