import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerModelComponent } from './customer-model.component';

describe('CustomerModelComponent', () => {
  let component: CustomerModelComponent;
  let fixture: ComponentFixture<CustomerModelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomerModelComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomerModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
