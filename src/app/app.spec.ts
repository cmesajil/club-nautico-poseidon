import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { provideRouter } from '@angular/router'; // <-- Importamos el proveedor de rutas

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]), // <-- Agregamos esto para simular el entorno de rutas
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
