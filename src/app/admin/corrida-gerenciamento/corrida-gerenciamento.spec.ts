import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorridaGerenciamento } from './corrida-gerenciamento';

describe('CorridaGerenciamento', () => {
  let component: CorridaGerenciamento;
  let fixture: ComponentFixture<CorridaGerenciamento>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorridaGerenciamento]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorridaGerenciamento);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
