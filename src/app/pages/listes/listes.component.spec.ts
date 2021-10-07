import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ListesComponent } from './listes.component';

describe('ListesComponent', () => {
  let component: ListesComponent;
  let fixture: ComponentFixture<ListesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ListesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
