import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FreshVegComponent } from './fresh-veg.component';

describe('FresgVegComponent', () => {
  let component: FreshVegComponent;
  let fixture: ComponentFixture<FreshVegComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FreshVegComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FreshVegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
