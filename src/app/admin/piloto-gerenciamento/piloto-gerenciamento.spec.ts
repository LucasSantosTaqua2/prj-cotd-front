import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PilotoGerenciamento } from './piloto-gerenciamento';

describe('PilotoGerenciamento', () => {
  let component: PilotoGerenciamento;
  let fixture: ComponentFixture<PilotoGerenciamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PilotoGerenciamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PilotoGerenciamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
