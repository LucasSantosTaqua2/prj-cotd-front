import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingGeral } from './ranking-geral';

describe('RankingGeral', () => {
  let component: RankingGeral;
  let fixture: ComponentFixture<RankingGeral>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RankingGeral]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RankingGeral);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
