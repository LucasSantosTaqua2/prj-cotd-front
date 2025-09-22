import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaList } from './corrida-list';

describe('CorridaList', () => {
  let component: CorridaList;
  let fixture: ComponentFixture<CorridaList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorridaList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorridaList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
