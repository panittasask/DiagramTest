import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgChartDiagramComponent } from './org-chart-diagram.component';

describe('OrgChartDiagramComponent', () => {
  let component: OrgChartDiagramComponent;
  let fixture: ComponentFixture<OrgChartDiagramComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrgChartDiagramComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrgChartDiagramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
