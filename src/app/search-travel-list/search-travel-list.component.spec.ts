import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchTravelListComponent } from './search-travel-list.component';

describe('SearchTravelListComponent', () => {
  let component: SearchTravelListComponent;
  let fixture: ComponentFixture<SearchTravelListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchTravelListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchTravelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
