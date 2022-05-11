import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGalponesGallinasComponent } from './lista-galpones-gallinas.component';

describe('ListaGalponesGallinasComponent', () => {
  let component: ListaGalponesGallinasComponent;
  let fixture: ComponentFixture<ListaGalponesGallinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGalponesGallinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGalponesGallinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
