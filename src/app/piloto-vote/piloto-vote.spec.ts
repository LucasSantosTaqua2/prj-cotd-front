import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotoVote } from './piloto-vote';

describe('PilotoVote', () => {
  let component: PilotoVote;
  let fixture: ComponentFixture<PilotoVote>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilotoVote]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilotoVote);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
