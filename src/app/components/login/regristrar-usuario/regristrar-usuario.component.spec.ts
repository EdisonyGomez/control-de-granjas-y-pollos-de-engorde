import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegristrarUsuarioComponent } from './regristrar-usuario.component';

describe('RegristrarUsuarioComponent', () => {
  let component: RegristrarUsuarioComponent;
  let fixture: ComponentFixture<RegristrarUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegristrarUsuarioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegristrarUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
