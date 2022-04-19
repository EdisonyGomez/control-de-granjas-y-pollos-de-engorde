import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClaveOlvidadaComponent } from './clave-olvidada.component';

describe('ClaveOlvidadaComponent', () => {
  let component: ClaveOlvidadaComponent;
  let fixture: ComponentFixture<ClaveOlvidadaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClaveOlvidadaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClaveOlvidadaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
