import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TerminosBusquedaComponent } from './terminos-busqueda.component';

describe('TerminosBusquedaComponent', () => {
  let component: TerminosBusquedaComponent;
  let fixture: ComponentFixture<TerminosBusquedaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TerminosBusquedaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TerminosBusquedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
