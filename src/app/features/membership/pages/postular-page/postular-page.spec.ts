import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PostularPage } from './postular-page';
import { Membership } from '../../services/membership';
import { Router } from '@angular/router';
import { of, throwError, asyncScheduler } from 'rxjs';

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
  // PRUEBA 1: Invocar servicio con ÉXITO (Actualizada para setTimeout)
  // ========================================================
  it('debería llamar al servicio de postulación y redirigir al usuario en caso de éxito', () => {
    // 1. Activamos los cronómetros falsos de Vitest
    vi.useFakeTimers();

    const datosDePrueba = { nombre: 'Carlos', correo: 'carlos@gmail.com' };
    const respuestaExitosa = { status: 'OK', mensaje: 'Postulación recibida' };

    membershipServiceMock.postular.mockReturnValue(of(respuestaExitosa));

    component.alRecibirDatos(datosDePrueba);

    // Verificamos que el servicio sí fue llamado de inmediato
    expect(membershipServiceMock.postular).toHaveBeenCalledWith(datosDePrueba);

    // 2. Adelantamos el reloj 3 segundos de golpe para romper el setTimeout
    vi.advanceTimersByTime(3000);

    // Ahora sí, la navegación debió ocurrir
    expect(routerMock.navigate).toHaveBeenCalledWith(['/Estados/postulacion']);

    // Limpiamos los timers
    vi.useRealTimers();
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

  // ========================================================
  // PRUEBA 2: Mostrar mensaje en HTML
  // ========================================================
  it('debería mostrar un mensaje de éxito en el HTML cuando la postulación sea exitosa', () => {
    const respuestaSimulada = { status: 'OK', mensaje: 'Registrado correctamente' };

    // Volvemos al 'of' síncrono normal para asegurar que pinte el HTML inmediatamente
    membershipServiceMock.postular.mockReturnValue(of(respuestaSimulada));

    // 1. Inicializamos el componente base
    fixture.detectChanges();

    // 2. Ejecutamos la acción que cambia la variable en el TS
    component.alRecibirDatos({ nombre: 'Carlos' });

    // 3. Forzamos un chequeo manual directo en el detector de cambios.
    // Esto sobrescribe el error NG0100 porque le decimos a Angular:
    // "Sé que cambió el valor, ignora las alertas de seguridad y redibuja ya mismo"
    fixture.componentRef.changeDetectorRef.detectChanges();

    // 4. Extraemos el DOM actualizado
    const compiled = fixture.nativeElement as HTMLElement;
    const alertaExito = compiled.querySelector('.alert-success');

    // 5. EVALUACIÓN
    expect(alertaExito).toBeTruthy();
    expect(alertaExito?.textContent).toContain('¡Postulación enviada con éxito!');
  });
});
