import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EspaceboitierComponent } from './espaceboitier.component';

describe('EspaceboitierComponent', () => {
  let component: EspaceboitierComponent;
  let fixture: ComponentFixture<EspaceboitierComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EspaceboitierComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EspaceboitierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
