import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewAllJobseesker } from './view-all-jobseesker';

describe('ViewAllJobseesker', () => {
  let component: ViewAllJobseesker;
  let fixture: ComponentFixture<ViewAllJobseesker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewAllJobseesker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewAllJobseesker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
