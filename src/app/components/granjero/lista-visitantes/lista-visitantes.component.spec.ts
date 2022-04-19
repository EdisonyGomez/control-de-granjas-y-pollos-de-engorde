import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaVisitantesComponent } from './lista-visitantes.component';

describe('ListaVisitantesComponent', () => {
  let component: ListaVisitantesComponent;
  let fixture: ComponentFixture<ListaVisitantesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaVisitantesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaVisitantesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
