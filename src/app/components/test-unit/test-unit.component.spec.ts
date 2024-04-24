import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUnitComponent } from './test-unit.component';

describe('TestUnitComponent', () => {
  let component: TestUnitComponent;
  let fixture: ComponentFixture<TestUnitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TestUnitComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TestUnitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
