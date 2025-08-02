import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddJobseesker } from './add-jobseesker';

describe('AddJobseesker', () => {
  let component: AddJobseesker;
  let fixture: ComponentFixture<AddJobseesker>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddJobseesker]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddJobseesker);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
