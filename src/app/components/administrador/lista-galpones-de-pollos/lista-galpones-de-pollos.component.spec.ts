import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGalponesDePollosComponent } from './lista-galpones-de-pollos.component';

describe('ListaGalponesDePollosComponent', () => {
  let component: ListaGalponesDePollosComponent;
  let fixture: ComponentFixture<ListaGalponesDePollosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGalponesDePollosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGalponesDePollosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
