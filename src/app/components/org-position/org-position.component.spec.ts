import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgPositionComponent } from './org-position.component';

describe('OrgPositionComponent', () => {
  let component: OrgPositionComponent;
  let fixture: ComponentFixture<OrgPositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgPositionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgPositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
