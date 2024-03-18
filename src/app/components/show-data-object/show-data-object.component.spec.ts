import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowDataObjectComponent } from './show-data-object.component';

describe('ShowDataObjectComponent', () => {
  let component: ShowDataObjectComponent;
  let fixture: ComponentFixture<ShowDataObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShowDataObjectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShowDataObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
