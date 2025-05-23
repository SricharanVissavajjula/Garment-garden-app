import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeafyGreensComponent } from './leafy-greens.component';

describe('LeafyGreensComponent', () => {
  let component: LeafyGreensComponent;
  let fixture: ComponentFixture<LeafyGreensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LeafyGreensComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LeafyGreensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
