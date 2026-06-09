import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostularPage } from './postular-page';
import { Membership } from '../../services/membership';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('PostularPage', () => {
  let component: PostularPage;
  let fixture: ComponentFixture<PostularPage>;

  // En Vitest usamos tipos genéricos más sencillos o 'any' para simular el mock rápido
  let membershipServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    // 1. Usamos vi.fn() en lugar de jest.fn()
    membershipServiceMock = {
      postular: vi.fn(),
    };

    routerMock = {
      navigate: vi.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [PostularPage],
      providers: [
        { provide: Membership, useValue: membershipServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(PostularPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // ========================================================
  // PRUEBA: Invocar servicio con ÉXITO
  // ========================================================
  it('debería llamar al servicio de postulación y redirigir al usuario en caso de éxito', () => {
    const datosDePrueba = { nombre: 'Carlos', correo: 'carlos@gmail.com' };
    const respuestaExitosa = { status: 'OK', mensaje: 'Postulación recibida' };

    // En Vitest se usa mockReturnValue igual que en Jest
    membershipServiceMock.postular.mockReturnValue(of(respuestaExitosa));

    component.alRecibirDatos(datosDePrueba);

    expect(membershipServiceMock.postular).toHaveBeenCalledWith(datosDePrueba);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/Estados/postulacion']);
  });

  // ========================================================
  // PRUEBA: ¿Qué pasa si el servicio falla?
  // ========================================================
  it('debería manejar el error si el servicio falla', () => {
    const datosDePrueba = { nombre: 'Carlos' };

    // En Vitest usamos vi.spyOn en lugar de jest.spyOn
    vi.spyOn(window, 'alert').mockImplementation(() => {});

    membershipServiceMock.postular.mockReturnValue(
      throwError(() => new Error('Error de servidor')),
    );

    component.alRecibirDatos(datosDePrueba);

    expect(window.alert).toHaveBeenCalledWith('Error al enviar');
  });
});
