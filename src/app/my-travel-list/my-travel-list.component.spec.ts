import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyTravelListComponent } from './my-travel-list.component';

describe('MyTravelListComponent', () => {
  let component: MyTravelListComponent;
  let fixture: ComponentFixture<MyTravelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyTravelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyTravelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
