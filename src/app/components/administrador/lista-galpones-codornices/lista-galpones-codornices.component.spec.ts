import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaGalponesCodornicesComponent } from './lista-galpones-codornices.component';

describe('ListaGalponesCodornicesComponent', () => {
  let component: ListaGalponesCodornicesComponent;
  let fixture: ComponentFixture<ListaGalponesCodornicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListaGalponesCodornicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaGalponesCodornicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
